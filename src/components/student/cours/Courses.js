import React, { Component } from "react";
import NavbarEleve from "../NavbarEleve";
import Course from "./Course";
import withData from "../../withData";

class CoursesEleves extends Component {
  state = { classes: [], courses: [] };

  componentDidMount() {
    setTimeout(() => {
      const { classes } = this.props.data;
      this.setState({ classes });
    }, 1000);
    const courses = [
      {
        id: 1,
        nom: "les Nombres Premiers",
        description: "cours sur les nombres premiers",
        instructions: "",
        matiere: "Mathématiques",
        classe: "6ème A",
        lien: "http://mathematiques.daval.free.fr/IMG/pdf/Fonctions_Cours.pdf",
      },
      {
        id: 2,
        nom: "les Fonctions",
        description: "cours sur les Fonctions",
        instructions: "",
        matiere: "Mathématiques",
        classe: "5ème A",
        lien: "http://mathematiques.daval.free.fr/IMG/pdf/Fonctions_Cours.pdf",
      },
      {
        id: 3,
        nom: "les polunomes",
        description: "cours sur les polynnomes",
        instructions: "",
        matiere: "Mathématiques",
        classe: "6ème A",
        lien: "http://mathematiques.daval.free.fr/IMG/pdf/Fonctions_Cours.pdf",
      },
      {
        id: 4,
        nom: "les Nombres Premiers",
        description: "cours sur les nombres premiers",
        instructions: "",
        matiere: "Mathématiques",
        classe: "6ème A",
        lien: "http://mathematiques.daval.free.fr/IMG/pdf/Fonctions_Cours.pdf",
      },
      {
        id: 5,
        nom: "les Nombres Premiers",
        description: "cours sur les nombres premiers",
        instructions: "",
        matiere: "Mathématiques",
        classe: "6ème B",
        lien: "http://mathematiques.daval.free.fr/IMG/pdf/Fonctions_Cours.pdf",
      },
    ];
    this.setState({ courses });
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
                <h2 className="text-center">Liste de Mes Cours</h2>
                <div
                  className="row col-12 mt-3"
                  style={{
                    border: "2px solid rgba(28,110,164,0.35)",
                    borderRadius: 18,
                  }}
                >
                  {this.state.courses.map((course) => (
                    <Course {...course} key={course.id} />
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

export default withData(CoursesEleves);
