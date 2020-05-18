import React, { Component } from "react";
import Navbar from "./admin/Navbar";
import NavbarProfesseur from "./teacher/NavbarProfesseur";
import { signOut, firestore, storage, auth } from "../firebase";

import NavbarEleve from "./student/NavbarEleve";

class CurrentUser extends Component {
  state = {
    email: "",
    nom: "",
    prenom: "",
    phoneNumber: "",
    type: "",
    password: "",
    confirmpassword: "",
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
        <section className="col-8 offset-2 mt-5" style={{}}>
          <div className="card">
            <div className="card-header">
              <h2>Bonjour {nomComplet}</h2>
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
                <div className="form-row">
                  <div className="col-6 form-group">
                    <label htmlFor="prenom">Prénom(s)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prenom"
                      onChange={this.handleChange}
                      id="prenom"
                      placeholder={prenom}
                      required
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label htmlFor="nom">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nom"
                      onChange={this.handleChange}
                      id="nom"
                      placeholder={nom}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-6 form-group">
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
                  <div className="col-6 form-group">
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
                </div>
                <button type="submit" className="btn btn-primary offset-5">
                  <i className="fas fa-edit"></i> Modifier Mon Profil
                </button>
              </form>

              <hr />
              {/* Update Profile Picture */}
              <form onSubmit={this.handleSubmitPhotoProfile}>
                <div className="form-row">
                  <div className="col-6">
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
                    <button type="submit" className="btn btn-primary offset-5">
                      <i className="fas fa-edit"></i> Modifier Ma Photo de
                      Profil
                    </button>
                  </div>
                </div>
              </form>
              <hr />

              {/* update Password */}
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
                  <button type="submit" className="btn btn-primary offset-5">
                    <i className="fas fa-edit"></i> Modifier Mon Mot de Passe
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <button className="btn btn-danger offset-10" onClick={signOut}>
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
