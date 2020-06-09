import React, { Component } from "react";
import Navbar from "./admin/Navbar";
import NavbarProfesseur from "./teacher/NavbarProfesseur";
import { signOut, firestore, storage, auth } from "../firebase";

import NavbarEleve from "./student/NavbarEleve";

class CurrentUser extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      nom: "",
      prenom: "",
      phoneNumber: "",
      type: "",
      password: "",
      confirmpassword: "",
    };

    localStorage.setItem("uid", props.uid);
  }

  componentDidMount = async () => {
    const data = await (await this.userRef.get()).data();
    localStorage.setItem("user", JSON.stringify(data));
  };

  imageInput = null;

  get uid() {
    return this.props.uid;
  }

  get userRef() {
    return firestore.doc(`users/${this.uid}`);
  }

  get file() {
    return this.imageInput && this.imageInput.files[0];
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handlePasswordChange = (event) => {
    event.preventDefault();
    const { password, confirmpassword } = this.state;
    console.log(password, confirmpassword);
    if (password === confirmpassword) {
      const curruser = auth.currentUser;
      signOut();
      curruser.updatePassword(password);
    }
  };

  handleSubmitPhotoProfile = async (event) => {
    event.preventDefault();
    const { nom, prenom } = this.props;

    try {
      if (this.file) {
        storage
          .ref()
          .child("users")
          .child(`${nom}${prenom}`)
          .child(this.file.name)
          .put(this.file)
          .then((response) => response.ref.getDownloadURL())
          .then(async (photoURL) => {
            console.log(photoURL);
            this.userRef.update({ photoURL });
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  HandleEditProfile = (event) => {
    event.preventDefault();
    const { email, nom, prenom, phoneNumber } = this.state;

    try {
      const userData = { nom, email, prenom, phoneNumber };
      this.userRef.update(userData);
      this.setState({ email: "", nom: "", prenom: "", phoneNumber: "" });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { photoURL, email, nom, prenom, phoneNumber, type } = this.props;
    const nomComplet = `${prenom} ${nom}`;
    return (
      <React.Fragment>
        {type === "administrateur" ? (
          <Navbar />
        ) : type === "professeur" ? (
          <NavbarProfesseur />
        ) : type === "eleve" ? (
          <NavbarEleve />
        ) : (
          ""
        )}
        <section className="col-lg-8 offset-lg-2 col-md-9 offset-md-2 col-sm-12 offset-sm-0 mt-5">
          <div
            className="card"
            style={{
              borderRadius: "37px 37px 37px 37px",
              border: "0px solid #EBEEF4",
            }}
          >
            <div
              className="card-header"
              style={{
                borderRadius: "37px 37px 0px 0px",
              }}
            >
              <h2 className="text-center">Bonjour {nomComplet}</h2>
            </div>
            <div className="card-body">
              <h3 className="text-center">Tes Informations</h3>
              <div className="row">
                <div className="col-4 offset-5">
                  <img
                    src={photoURL}
                    alt={`${prenom} ${nom}`}
                    style={{ height: 200, width: 200, borderRadius: 50 }}
                  />
                </div>
              </div>
              <br />
              <form onSubmit={this.HandleEditProfile}>
                {/* Prenom et Nom du Profil en Cours */}
                <div className="form-row">
                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <label htmlFor="prenom">Prénom(s)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prenom"
                      placeholder={prenom}
                      onChange={this.handleChange}
                      id="prenom"
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <label htmlFor="nom">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nom"
                      placeholder={nom}
                      onChange={this.handleChange}
                      id="nom"
                      required
                    />
                  </div>
                </div>
                {/* Email et Téléphone du Profil en Cours */}
                <div className="form-row">
                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={this.handleChange}
                      id="email"
                      placeholder={email}
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <label htmlFor="telephone">Téléphone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      onChange={this.handleChange}
                      id="telephone"
                      placeholder={phoneNumber}
                      required
                    />
                  </div>

                  {/* Classe si c'est un Eleve qui est Connecté */}
                  {this.props.classeObj ? (
                    <div className="col-6 form-group">
                      <label htmlFor="classe">Classe</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleChange}
                        id="classe"
                        placeholder={this.props.classeObj.nom}
                        readOnly
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {/* Boutton du formulaire pour modifier son Profil */}
                <button
                  type="submit"
                  className="btn btn-primary offset-lg-5 offset-md-5 offset-sm-4"
                >
                  <i className="fas fa-edit"></i> Modifier Mon Profil
                </button>
              </form>

              <hr />
              {/* Formulaire de Mise à Jour de la Photo de Profil */}
              <form onSubmit={this.handleSubmitPhotoProfile}>
                <div className="form-row">
                  {/* <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="image">Photo de Profil</label>
                      <input
                        type="file"
                        ref={(ref) => (this.imageInput = ref)}
                        className="form-control-file"
                      />
                    </div>
                  </div>
                  <div className="col-6 offset-0">
                    <button
                      type="submit"
                      className="btn btn-primary offset-lg-5 offset-md-5 offset-sm-4n"
                    >
                      <i className="fas fa-edit"></i> Modifier Ma Photo de
                      Profil
                    </button>
                  </div> */}
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile02"
                        ref={(ref) => (this.imageInput = ref)}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile02"
                      >
                        Choisissez une Photo de Profil
                      </label>
                    </div>
                    <div className="input-group-append">
                      <button type="submit" className="input-group-text" id="">
                        Modifier ma Photo de Profil
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <hr />

              {/* Formulaire de Mise à Jour du Mot de Passe */}
              <form onSubmit={this.handlePasswordChange}>
                <div className="form-row">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="password">Mot de Passe</label>
                      <input
                        type="text"
                        className="form-control"
                        name="password"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="password">
                        Confirmer le Mot de Passe
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="confirmpassword"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <button
                    type="submit"
                    className="btn btn-primary offset-5 offset-sm-4"
                  >
                    <i className="fas fa-edit"></i> Modifier Mon Mot de Passe
                  </button>
                </div>
              </form>
            </div>
            {/* Boutton de Déconnexion */}
            <div
              className="card-footer"
              style={{
                borderRadius: "0px 0px 37px 37px",
              }}
            >
              <button
                className="btn btn-danger offset-xl-9 offset-lg-8 offset-md-8 offset-sm-8"
                onClick={signOut}
              >
                <i className="fas fa-door-open"></i> Me déconnecter
              </button>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default CurrentUser;
