import React, { Component } from "react";
import NavbarEleve from "../NavbarEleve";
import Exercice from "./Exercice";
import withData from "../../withData";
import { auth, firestore } from "../../../firebase";
import Loading from "../../loading/Loading";

class ExercicesEleves extends Component {
  state = { classes: [], exercices: [], loading: true, user: [] };

  componentDidMount() {
    setTimeout(async () => {
      const user = auth.currentUser;
      const snapshot = await firestore.collection("users").doc(user.uid).get();
      const data = snapshot.data();

      const classes = this.props.data.classes;
      const exercices = this.props.data.exercices;
      const currentexercice = exercices.filter(
        (exercice) => exercice.classename === data.classename
      );
      this.setState({
        classes,
        exercices: currentexercice,
        loading: false,
        user: data,
      });
    }, 2000);
  }

  render() {
    return (
      <React.Fragment>
        <NavbarEleve />

        {this.state.loading ? (
          <Loading />
        ) : (
          <div className="container-fluid">
            <div className="row">
              <div className="col-1"></div>
              <div className="col-10">
                <div className="container-fluid mt-5">
                  <h2 className="text-left">Liste de Mes Exercices</h2>
                  <div
                    className="row col-12 mt-3 card-layout"
                    style={{
                      border: "2px solid rgba(28,110,164,0.35)",
                      borderRadius: 18,
                    }}
                  >
                    {this.state.exercices.map((exercice) => (
                      <Exercice exercice={exercice} key={exercice.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withData(ExercicesEleves);
