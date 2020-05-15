import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarProfesseur from "../NavbarProfesseur";
import Exercice from "./Exercice";
import { auth, firestore } from "../../../firebase";
import { collectIdsAndDocs } from "../../../utilities";

class Exercices extends Component {
  state = { classes: [], exercices: [], user: [] };

  unsubscribeFromExercices = null;

  componentWillMount() {
    setTimeout(() => {
      const user = auth.currentUser;
      this.setState({ user });
    }, 1000);
  }

  componentDidMount() {
    this.unsubscribeFromExercices = firestore
      .collection("exercices")
      .onSnapshot((snapshot) => {
        const exercices = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ exercices });
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromExercices = null;
  }

  render() {
    return (
      <React.Fragment>
        <NavbarProfesseur />

        <div className="container-fluid">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <div className="container-fluid mt-5">
                <h2 className="text-center">Liste de Mes Exercices</h2>
                <div className="row">
                  <div className="col-4 offset-10">
                    <Link to="/enseignants/exercices/add">
                      <button className="btn btn-success">
                        {" "}
                        <i
                          className="fa fa-plus-circle"
                          aria-hidden="true"
                        ></i>{" "}
                        Nouvel Exercice
                      </button>
                    </Link>
                  </div>
                </div>
                <div
                  className="row col-12 mt-3"
                  style={{
                    border: "2px solid rgba(28,110,164,0.35)",
                    borderRadius: 18,
                  }}
                >
                  {this.state.exercices
                    .filter(
                      (exercice) => exercice.user.uid === this.state.user.uid
                    )
                    .map((exercices) => (
                      <Exercice exercice={exercices} key={exercices.id} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Exercices;
