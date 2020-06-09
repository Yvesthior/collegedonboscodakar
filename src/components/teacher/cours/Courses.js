import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarProfesseur from "../NavbarProfesseur";
import Loading from "../../loading/Loading";
import Course from "./Course";
import { firestore } from "../../../firebase";
import { collectIdsAndDocs } from "../../../utilities";

class Courses extends Component {
  state = {
    classes: [],
    courses: [],
    user: [],
    loading: true,
    displayName: "",
  };

  unsubscribeFromCourses = null;

  componentDidMount() {
    const { nom, prenom } = JSON.parse(localStorage.getItem("user"));
    const displayName = `${nom.toLowerCase()}-${prenom
      .replace(" ", "-")
      .toLowerCase()}`;
    setTimeout(() => {
      const user = localStorage.getItem("uid");
      this.setState({ user });

      this.unsubscribeFromCourses = firestore
        .collection("cours")
        .onSnapshot((snapshot) => {
          const courses = snapshot.docs.map(collectIdsAndDocs);
          this.setState({ courses, loading: false, displayName });
        });
    }, 2000);
  }

  componentWillUnmount() {
    this.unsubscribeFromCourses = null;
  }

  render() {
    return (
      <React.Fragment>
        <div>
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
                      <h2 className="text-center">Liste de Mes Cours</h2>
                      <div className="row">
                        <div className="col-4 offset-10">
                          <Link
                            to={`/enseignants/${this.state.displayName}/cours/add`}
                          >
                            <button className="btn btn-success">
                              {" "}
                              <i
                                className="fa fa-plus-circle"
                                aria-hidden="true"
                              ></i>{" "}
                              Nouveau Cours
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
                        {this.state.courses === null ? (
                          <div>
                            <h3>Vous n'avez encore enregistré aucun Cours</h3>
                          </div>
                        ) : (
                          this.state.courses
                            .filter(
                              (cours) => cours.user.uid === this.state.user
                            )
                            .map((course) => (
                              <Course cours={course} key={course.id} />
                            ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        </div>
      </React.Fragment>
    );
  }
}

export default Courses;
