import React, { Component } from "react";
import { auth, createUserProfileDocument, firestore } from "../firebase";
import { DataContext } from "../providers/DataProvider";

export default class SignUp extends Component {
  state = {
    nom: "",
    prenom: "",
    telephone: "",
    age: "",
    email: "",
    classe: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { nom, prenom, telephone, classe, age, email } = this.state;
    console.log(this.state);
    // const newemail = email + "@collegedonboscodakar.com";
    // console.log(newemail);
    const password = email;
    const type = "eleve";
    const displayName = `${prenom} ${nom}`;
    const phoneNumber = telephone;

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
      age,
      type,
    };

    try {
      const eleve = await auth.createUserWithEmailAndPassword(email, password);
      const newUser = { ...eleve };
      createUserProfileDocument(newUser, studentProfil);

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
    const { nom, prenom, telephone, email, age, classe } = this.state;
    return (
      <React.Fragment>
        <div className="card card-outline-secondary">
          <div className="card-header">
            <h2 className="mb-0">Formulaire d'Inscription</h2>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="nom">Nom : </label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  value={nom}
                  onChange={this.handleChange}
                  className="form-control"
                  required
                  placeholder="Nom de votre enfant"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prenom">Prénom : </label>
                <input
                  type="text"
                  value={prenom}
                  onChange={this.handleChange}
                  name="prenom"
                  id="prenom"
                  className="form-control"
                  placeholder="Prénom de votre enfant"
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age : </label>
                <input
                  type="text"
                  value={age}
                  onChange={this.handleChange}
                  name="age"
                  id="age"
                  className="form-control"
                  placeholder="Age de votre enfant"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Téléphone : </label>
                <input
                  type="text"
                  value={telephone}
                  onChange={this.handleChange}
                  name="telephone"
                  id="telephone"
                  className="form-control"
                  placeholder="Téléphone de votre enfant ou Téléphone du Parent"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email : </label>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    id="email"
                    placeholder="Email de votre Enfant sans espace"
                    aria-label="email"
                    aria-describedby="email"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text" id="email">
                      ajouter @collegedonboscodakar.com au nom de l'enfant
                    </span>
                  </div>
                </div>
              </div>
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
                  <option value="">Choisissez la Classe de votre enfant</option>
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
              <button
                type="submit"
                className="btn btn-success btn-lg float-right"
              >
                Inscription
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
