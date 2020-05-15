import React, { Component } from "react";
import { firestore } from "../../../firebase";
import Navbar from "../Navbar";

export default class AddClasse extends Component {
  state = {
    sigle: "",
    nom: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { sigle, nom } = this.state;

    const classe = {
      sigle,
      nom,
    };
    try {
      firestore.collection("classes").add(classe);
      // const message = "Classe Ajoutée avec Succès";
      // const classname = "alert alert-success";
      // this.setState({ message, classname });
    } catch (error) {
      console.error("Erreur Lors de la Création", error.message);
    }
    this.setState({ sigle: "", nom: "" });
  };

  render() {
    const { sigle, nom, message, classname } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <hr className="mb-5" />
        <div className="row">
          <div className="col-md-7 offset-md-3 mt-5">
            <div className={classname} role="alert">
              {message}
            </div>
            <div className="card card-outline-secondary">
              <div className="card-header">
                <h2 className="mb-0">Nouvelle Classe</h2>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit} className="form">
                  <div className="form-group">
                    <label htmlFor="sigle">Sigle de la Classe</label>
                    <input
                      type="text"
                      name="sigle"
                      id="sigle"
                      value={sigle}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="Sigle"
                      required
                    />
                    <div className="invalid-feedback">
                      Veuillez Entrer un Sigle, Ex: 6ème A.
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom">Nom de la Classe</label>
                    <input
                      type="text"
                      value={nom}
                      onChange={this.handleChange}
                      name="nom"
                      id="nom"
                      className="form-control"
                      placeholder="Nom"
                    />
                    <div className="invalid-feedback">
                      Veuillez Entrer un Nom de Classe, Ex: Sixième A
                    </div>
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
