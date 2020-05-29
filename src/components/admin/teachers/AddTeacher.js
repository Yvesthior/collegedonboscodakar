import React, { Component } from "react";
import { auth, createUserProfileDocument } from "../../../firebase";
import Navbar from "../Navbar";

export default class AddTeacher extends Component {
  state = {
    nom: "",
    prenom: "",
    telephone: "",
    matiere: "",
    email: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { nom, prenom, telephone, matiere, email } = this.state;
    const password = email;
    const type = "professeur";
    const displayName = `${prenom} ${nom}`;
    const phoneNumber = telephone;

    const teacherProfil = {
      nom,
      prenom,
      displayName,
      phoneNumber,
      email,
      matiere,
      type,
    };

    try {
      const teacher = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const newUser = { ...teacher };
      createUserProfileDocument(newUser, teacherProfil);

      console.log(newUser);
    } catch (error) {
      console.error(error);
    }
    // this.setState({
    //   nom: "",
    //   prenom: "",
    //   telephone: "",
    //   matiere: "",
    //   email: "",
    // });
  };
  render() {
    const { nom, prenom, telephone, matiere, email } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <hr className="mb-5" />
        <div className="row">
          <div className="col-md-7 offset-md-3 mt-5">
            <div className="card card-outline-secondary">
              <div className="card-header">
                <h2 className="mb-0">Nouveau Professeur</h2>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit} className="form">
                  <div className="form-group">
                    <label htmlFor="sigle">Nom du Professeur</label>
                    <input
                      type="text"
                      name="nom"
                      id="nom"
                      value={nom}
                      onChange={this.handleChange}
                      className="form-control"
                      required
                      placeholder="Nom"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom">Prénom du Profeeseur</label>
                    <input
                      type="text"
                      value={prenom}
                      onChange={this.handleChange}
                      name="prenom"
                      id="prenom"
                      className="form-control"
                      placeholder="Prénom"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom">Matière Enseignée</label>
                    <input
                      type="text"
                      value={matiere}
                      onChange={this.handleChange}
                      name="matiere"
                      id="matiere"
                      className="form-control"
                      placeholder="Matière"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom">Téléphone du Professeur</label>
                    <input
                      type="text"
                      value={telephone}
                      onChange={this.handleChange}
                      name="telephone"
                      id="telephone"
                      className="form-control"
                      placeholder="Téléphone"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email du Professeur</label>
                    <input
                      type="text"
                      value={email}
                      onChange={this.handleChange}
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="adresse mail"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success btn-lg float-right"
                  >
                    Enregistrer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
