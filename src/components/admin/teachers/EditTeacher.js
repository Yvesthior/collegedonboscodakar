import React, { Component } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import Loading from "../../loading/Loading";
import { firestore } from "../../../firebase";

class EditTeacher extends Component {
  state = {
    nom: "",
    prenom: "",
    phoneNumber: "",
    email: "",
    displayName: "",
    loading: true,
  };

  componentDidMount = async () => {
    const currentUser = await firestore
      .doc(`/users/${this.props.match.params.id}`)
      .get();
    const userData = currentUser.data();
    const { nom, prenom, phoneNumber, email, displayName } = userData;

    this.setState({
      nom,
      displayName,
      prenom,
      phoneNumber,
      email,
      loading: false,
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

    const { nom, prenom, phoneNumber, email } = this.state;

    const displayName = `${prenom} ${nom}`;

    const teacherProfile = {
      nom,
      prenom,
      displayName,
      phoneNumber,
      email,
    };

    try {
      this.userRef.update(teacherProfile);
      this.setState({
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
      });
      return this.props.history.push("/admin/enseignants");
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
      loading,
      displayName,
    } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        {loading === true ? (
          <Loading />
        ) : (
          <div className="container-fluid mt-5 col-8 offset-2">
            <div className="row mb-1">
              <Link to="/admin/enseignants">
                <button className="btn btn-secondary btn-lg">
                  {" "}
                  <i className="fas fa-arrow-left"></i> Retour
                </button>
              </Link>
            </div>
            <div className="card" style={{ background: "#fff" }}>
              <div className="card-header">
                <div className="text-center">
                  <h2>Profil de {displayName || `${prenom} ${nom}`}</h2>
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
                      <div className="form-group col-md-6">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={email}
                          onChange={this.handleChange}
                        />
                      </div>
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

export default EditTeacher;
