import React, { Component } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import Loading from "../../loading/Loading";
import { firestore } from "../../../firebase";

class EditStudent extends Component {
  state = {
    nom: "THIOR",
    prenom: "Yves Robert",
    phoneNumber: 779716833,
    email: "yvesthior@gmail.com",
    classename: "licence",
    classes: [],
    classe: "",
    displayName: "",
    loading: true,
  };

  componentDidMount = async () => {
    const currentUser = await firestore
      .doc(`/users/${this.props.match.params.id}`)
      .get();
    const userData = currentUser.data();
    const {
      nom,
      prenom,
      phoneNumber,
      email,
      classename,
      displayName,
    } = userData;
    const classes = JSON.parse(localStorage.getItem("classes"));
    this.setState({
      nom,
      prenom,
      phoneNumber,
      email,
      displayName,
      classename,
      loading: false,
      classes,
    });
  };
  get userRef() {
    return firestore.doc(`users/${this.props.match.params.id}`);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { nom, prenom, phoneNumber, classe, email } = this.state;

    const displayName = `${prenom} ${nom}`;

    const snapshot = await firestore.collection("classes").doc(classe).get();
    const data = snapshot.data();

    const classeObj = { id: classe, ...data };
    const classename = data.nom;

    const studentProfil = {
      nom,
      prenom,
      displayName,
      phoneNumber,
      classeObj,
      classename,
      email,
    };

    try {
      this.userRef.update(studentProfil);
      this.setState({
        nom: "",
        prenom: "",
        telephone: "",
        matiere: "",
        email: "",
      });
      return this.props.history.push("/admin/eleves");
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      nom,
      prenom,
      phoneNumber,
      email,
      classename,
      loading,
      displayName,
      classes,
    } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        {loading === true ? (
          <Loading />
        ) : (
          <div className="container-fluid mt-5 col-8 offset-2">
            <div className="row mb-1">
              <Link to="/admin/eleves">
                <button className="btn btn-secondary btn-lg">
                  {" "}
                  <i className="fas fa-arrow-left"></i> Retour
                </button>
              </Link>
            </div>
            <div className="card" style={{ background: "#fff" }}>
              <div className="card-header">
                <div className="text-center">
                  <h2>Profil de {displayName}</h2>
                </div>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="nom">Nom de l'élève</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nom"
                          name="nom"
                          placeholder={nom}
                          value={nom}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="prenom">Prénom de l'élève</label>
                        <input
                          type="text"
                          className="form-control"
                          id="prenom"
                          name="prenom"
                          placeholder="prenom"
                          value={prenom}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="classe">Classe</label>
                        <select
                          id="classe"
                          name="classe"
                          className="form-control"
                          onChange={this.handleChange}
                          required
                        >
                          <option value="">{classename}</option>

                          {classes.map((classe) => (
                            <option key={classe.id} value={classe.id}>
                              {" "}
                              {classe.nom}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group col-md-6">
                        <label htmlFor="telephone">Téléphone</label>
                        <input
                          type="text"
                          className="form-control"
                          id="telephone"
                          name="phoneNumber"
                          placeholder="telephone"
                          value={phoneNumber}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        name="email"
                        onChange={this.handleChange}
                        value={email}
                      />
                    </div>
                    <div className="col-3 offset-5">
                      <button type="submit" className="btn btn-success">
                        <i className="fas fa-edit" aria-hidden="true"></i>{" "}
                        Modifier le Profil
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default EditStudent;
