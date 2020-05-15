import React, { Component } from "react";
import NavbarEleve from "../NavbarEleve";
import Exercice from "./Exercice";
import withData from "../../withData";

class ExercicesEleves extends Component {
  state = { classes: [], exercices: [] };
  componentDidMount() {
    setTimeout(() => {
      const { classes } = this.props.data;
      this.setState({ classes });
    }, 1000);
    const exercices = [
      {
        id: 1,
        nom: "les Nombres Premiers",
        description: "Exercice sur les nombres premiers",
        instructions: "",
        matiere: "Mathématiques",
        lien: "http://math.univ-lyon1.fr/~pujo/ANALYSE1-TD2.pdf",
      },
      {
        id: 2,
        nom: "les Fonctions",
        description: "Exercice sur les Fonctions",
        instructions: "",
        matiere: "Mathématiques",
        lien: "http://math.univ-lyon1.fr/~pujo/ANALYSE1-TD2.pdf",
      },
      {
        id: 3,
        nom: "les polunomes",
        description: "Exercice sur les polynnomes",
        instructions: "",
        matiere: "Mathématiques",
        lien: "http://math.univ-lyon1.fr/~pujo/ANALYSE1-TD2.pdf",
      },
      {
        id: 4,
        nom: "les Nombres Premiers",
        description: "Exercice sur les nombres premiers",
        instructions: "",
        matiere: "Mathématiques",
        lien: "http://math.univ-lyon1.fr/~pujo/ANALYSE1-TD2.pdf",
      },
      {
        id: 5,
        nom: "les Nombres Premiers",
        description: "Exercice sur les nombres premiers",
        instructions: "",
        matiere: "Mathématiques",
        classe: "6ème B",
        lien: "http://math.univ-lyon1.fr/~pujo/ANALYSE1-TD2.pdf",
      },
    ];
    this.setState({ exercices });
  }

  render() {
    return (
      <React.Fragment>
        <NavbarEleve />

        <div className="container-fluid">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <div className="container-fluid mt-5">
                <h2 className="text-center">Liste de Mes Exercices</h2>
                <div
                  className="row col-12 mt-3"
                  style={{
                    border: "2px solid rgba(28,110,164,0.35)",
                    borderRadius: 18,
                  }}
                >
                  {this.state.exercices.map((exercice) => (
                    <Exercice {...exercice} key={exercice.id} />
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

export default withData(ExercicesEleves);
