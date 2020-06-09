import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarProfesseur from "../NavbarProfesseur";
import Exercice from "./Exercice";
import { firestore } from "../../../firebase";
import { collectIdsAndDocs } from "../../../utilities";
import Loading from "../../loading/Loading";

class Exercices extends Component {
  state = { classes: [], exercices: [], user: [], loading: true };

  unsubscribeFromExercices = null;

  componentDidMount() {
    const displayName = localStorage.getItem("displayName");
    setTimeout(() => {
      const user = localStorage.getItem("uid");
      this.setState({ user });

      this.unsubscribeFromExercices = firestore
        .collection("exercices")
        .onSnapshot((snapshot) => {
          const exercices = snapshot.docs.map(collectIdsAndDocs);
          this.setState({ exercices, loading: false, displayName });
        });
    }, 2000);
  }

  componentWillUnmount() {
    this.unsubscribeFromExercices = null;
  }

  render() {
    return (
      <React.Fragment>
        <NavbarProfesseur />

        {this.state.loading ? (
          <Loading />
        ) : (
          <div className="container-fluid">
            <div className="row">
              <div className="col-1"></div>
              <div className="col-10">
                <div className="container-fluid mt-5">
                  <h2 className="text-center">Liste de Mes Exercices</h2>
                  <div className="row">
                    <div className="col-4 offset-10">
                      <Link
                        to={`/enseignants/${this.state.displayName}/exercices/add`}
                      >
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

                  {this.state.exercices ? (
                    <div
                      className="row col-12 mt-3"
                      style={{
                        border: "2px solid rgba(28,110,164,0.35)",
                        borderRadius: 18,
                      }}
                    >
                      {this.state.exercices
                        .filter(
                          (exercice) => exercice.user.uid === this.state.user
                        )
                        .map((exercices) => (
                          <Exercice exercice={exercices} key={exercices.id} />
                        ))}
                    </div>
                  ) : (
                    <h1>aucun exercice enregistré</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Exercices;
