import React, { Component } from "react";
import NavbarEleve from "../NavbarEleve";
import Course from "./Course";
import withData from "../../withData";
import { auth, firestore } from "../../../firebase";

class CoursesEleves extends Component {
  state = { classes: [], courses: [], loading: true, user: [] };

  componentDidMount() {
    setTimeout(async () => {
      const user = auth.currentUser;
      const snapshot = await firestore.collection("users").doc(user.uid).get();
      const data = snapshot.data();

      const classes = this.props.data.classes;
      const courses = this.props.data.courses;
      const currentcourse = courses.filter(
        (course) => course.classename === data.classename
      );
      this.setState({ classes, courses: currentcourse, loading: false, user });
    }, 2000);
  }

  render() {
    return (
      <React.Fragment>
        <NavbarEleve />

        {this.state.loading === true ? (
          <h1>Chargement des données en Cours</h1>
        ) : (
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
                      <Course course={course} key={course.id} />
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

export default withData(CoursesEleves);
