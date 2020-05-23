import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { firestore } from "../../../firebase";
import { collectIdsAndDocs } from "../../../utilities";
import NavbarEleve from "../NavbarEleve";

class ExercicePage extends Component {
  state = {
    exercice: [],
  };

  imageInput = null;

  get exerciceId() {
    return this.props.match.params.id;
  }

  get exerciceRef() {
    return firestore.doc(`exercices/${this.exerciceId}`);
  }

  unsubscribeFromExercice = null;

  componentWillMount = async () => {
    this.unsubscribeFromExercice = this.exerciceRef.onSnapshot((snapshot) => {
      const exercice = collectIdsAndDocs(snapshot);
      this.setState({ exercice });
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromExercice();
  }

  get file() {
    return this.imageInput && this.imageInput.files[0];
  }

  render() {
    const { exercice } = this.state;
    return (
      <React.Fragment>
        <NavbarEleve />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <Link to="/eleves/cours">
                {" "}
                <button className="btn btn-lg btn-outline-secondary">
                  {" "}
                  <i className="fas fa-arrow-left"></i> Retour
                </button>
              </Link>
            </div>
            <div className="col-md-6 offset-2">
              <h2 className="text-center">Exercice : {exercice.nom}</h2>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="card p-5">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="nom">Nom : </label>
                <input
                  type="text"
                  value={exercice.nom}
                  className="form-control"
                  id="nom"
                  name="nom"
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="description">Description : </label>
                <textarea
                  type="text"
                  value={exercice.description}
                  className="form-control"
                  id="description"
                  name="description"
                  readOnly
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="instructions">Instructions : </label>
              <textarea
                type="textarea"
                value={exercice.instructions}
                className="form-control"
                id="instructions"
                name="instructions"
                readOnly
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-info ml-4">
                <a href={exercice.docurl}>
                  {" "}
                  <i className="fas fa-eye"></i> Visualiser le document
                </a>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ExercicePage);
