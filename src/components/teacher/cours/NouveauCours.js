import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarProfesseur from "../NavbarProfesseur";
import { DataContext } from "../../../providers/DataProvider";
import { storage, firestore } from "../../../firebase";

import withUser from "../../withUser";

class NouveauCours extends Component {
  state = {
    nom: "",
    description: "",
    instructions: "",
    matiere: "",
    classe: "",
    docurl: "",
  };
  imageInput = null;
  get file() {
    return this.imageInput && this.imageInput.files[0];
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
              classename: classeObj.nom,
              matierename: matiereObj.nom,
              description,
              instructions,
              classe: classeObj,
              matiere: matiereObj,
              user,
              docurl,
            };

            firestore.collection("cours").add(cours);

            this.setState({
              nom: "",
              description: "",
              instructions: "",
              matiere: "",
              classe: "",
            });
            this.props.history.push("/enseignants/cours");
          });
      }
    } catch (err) {
      console.error(err);
    }
    // this.userRef.update({ photoURL })
  };
  componentDidMount() {
    const displayName = localStorage.getItem("displayName");
    this.setState({ displayName });
  }

  render() {
    const {
      nom,
      description,
      instructions,
      matiere,
      classe,
      displayName,
    } = this.state;
    return (
      <React.Fragment>
        <NavbarProfesseur />
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-md-4">
              <Link to={`/enseignants/${displayName}/cours`}>
                {" "}
                <button className="btn btn-lg btn-outline-secondary">
                  {" "}
                  <i className="fas fa-arrow-left"></i> Retour
                </button>
              </Link>
            </div>
            <div className="col-md-6 offset-2">
              <h2 className="text-center">Ajout d'un Nouveau Cours</h2>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-5">
          <form className="card p-5" onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="nom">Nom : </label>
                <input
                  type="text"
                  value={nom}
                  className="form-control"
                  id="nom"
                  onChange={this.handleChange}
                  name="nom"
                  placeholder="Nom du Cours"
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="description">Description : </label>
                <input
                  type="text"
                  value={description}
                  className="form-control"
                  onChange={this.handleChange}
                  id="description"
                  name="description"
                  placeholder="Description du Cours"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="instructions">Instructions : </label>
              <textarea
                type="textarea"
                value={instructions}
                className="form-control"
                onChange={this.handleChange}
                id="instructions"
                name="instructions"
                placeholder="Instructions par rapport au Cours"
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
                required
              />
            </div>
            <div className="form-row">
              {/* Classes */}
              <div className="form-group col-md-4">
                <label htmlFor="classe">Classe</label>
                <select
                  id="classe"
                  value={classe}
                  name="classe"
                  className="form-control"
                  onChange={this.handleChange}
                  required
                >
                  <option value="">Choisissez une Classe...</option>
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
                  value={matiere}
                  name="matiere"
                  className="form-control"
                  onChange={this.handleChange}
                  required
                >
                  <option value="choose">Choisissez une Matière...</option>
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
            <button type="submit" className="btn btn-outline-success">
              Ajouter un Cours
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withUser(NouveauCours);
