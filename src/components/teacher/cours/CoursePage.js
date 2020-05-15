import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import NavbarProfesseur from "../NavbarProfesseur";
import { DataContext } from "../../../providers/DataProvider";
import { firestore, storage } from "../../../firebase";
import { collectIdsAndDocs } from "../../../utilities";
import withUser from "../../withUser";

class CoursePage extends Component {
  state = {
    nom: "",
    description: "",
    instructions: "",
    matiere: "",
    classe: "",
    docurl: "",
    course: [],
  };

  imageInput = null;

  get courseId() {
    return this.props.match.params.id;
  }

  get courseRef() {
    return firestore.doc(`cours/${this.courseId}`);
  }

  unsubscribeFromCourse = null;

  componentWillMount = async () => {
    this.unsubscribeFromCourse = this.courseRef.onSnapshot((snapshot) => {
      const course = collectIdsAndDocs(snapshot);
      this.setState({ course });
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromCourse();
  }

  get file() {
    return this.imageInput && this.imageInput.files[0];
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDelete = () => {
    this.courseRef.delete();
    this.props.history.push("/enseignants/cours");
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { nom, description, instructions, matiere, classe } = this.state;

    try {
      if (this.file) {
        storage
          .ref()
          .child("cours")
          .child(classe)
          .child(this.file.name)
          .put(this.file)
          .then((response) => response.ref.getDownloadURL())
          .then(async (docurl) => {
            const snapshot = await firestore
              .collection("classes")
              .doc(classe)
              .get();
            const snapshota = await firestore
              .collection("matieres")
              .doc(matiere)
              .get();

            const data = snapshot.data();
            const matieredata = snapshota.data();
            const classeObj = { id: classe, ...data };
            const matiereObj = { id: matiere, ...matieredata };
            const { user } = this.props;

            const cours = {
              nom,
              description,
              instructions,
              classe: classeObj,
              matiere: matiereObj,
              user,
              docurl,
            };

            this.courseRef.update(cours);

            this.props.history.push("/enseignants/cours");
          });
      }
    } catch (err) {
      console.error(err);
    }
  };
  render() {
    const { course } = this.state;
    console.log(this.props);
    console.log(course.classe);
    return (
      <React.Fragment>
        <NavbarProfesseur />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <Link to="/enseignants/cours">
                {" "}
                <button className="btn btn-lg btn-outline-secondary">
                  {" "}
                  <i className="fas fa-arrow-left"></i> Retour
                </button>
              </Link>
            </div>
            <div className="col-md-6 offset-2">
              <h2 className="text-center">Cours : {course.nom}</h2>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <form className="card p-5" onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="nom">Nom : </label>
                <input
                  type="text"
                  placeholder={course.nom}
                  className="form-control"
                  id="nom"
                  onChange={this.handleChange}
                  name="nom"
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="description">Description : </label>
                <input
                  type="text"
                  placeholder={course.description}
                  className="form-control"
                  onChange={this.handleChange}
                  id="description"
                  name="description"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="instructions">Instructions : </label>
              <textarea
                type="textarea"
                placeholder={course.instructions}
                className="form-control"
                onChange={this.handleChange}
                id="instructions"
                name="instructions"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fichier">Fichier du Cours</label>
              <input
                type="file"
                ref={(ref) => (this.imageInput = ref)}
                className="form-control-file"
                id="fichier"
                placeholder="fichier du Cours"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-info ml-4">
                <a href={course.docurl}>
                  {" "}
                  <i className="fas fa-eye"></i> Visualiser
                </a>
              </button>
            </div>
            <div className="form-row">
              {/* Classes */}
              <div className="form-group col-md-4">
                <label htmlFor="classe">Classe</label>
                <select
                  id="classe"
                  name="classe"
                  className="form-control"
                  onChange={this.handleChange}
                  required
                >
                  <option value="">{course.classename}</option>
                  <DataContext.Consumer>
                    {(data) => {
                      const { classes } = data;
                      return classes.map((classe) => (
                        <option key={classe.id} value={classe.id}>
                          {" "}
                          {classe.nom}
                        </option>
                      ));
                    }}
                  </DataContext.Consumer>
                </select>
              </div>
              {/* matieres */}
              <div className="form-group col-md-4">
                <label htmlFor="matiere">Matière</label>
                <select
                  id="matiere"
                  name="matiere"
                  className="form-control"
                  onChange={this.handleChange}
                  required
                >
                  <option value="choose">{course.matierename}</option>
                  <DataContext.Consumer>
                    {(data) => {
                      const { matieres } = data;
                      return matieres.map((matiere) => (
                        <option key={matiere.id} value={matiere.id}>
                          {matiere.nom}
                        </option>
                      ));
                    }}
                  </DataContext.Consumer>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="col-6">
                <button type="submit" className="btn btn-outline-success">
                  Modifier le Cours
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-danger" onClick={this.handleDelete}>
                  Supprimer le Cours
                </button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withUser(CoursePage));
