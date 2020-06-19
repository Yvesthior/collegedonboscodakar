import React, { Component, createContext } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

export const DataContext = createContext();

class DataProvider extends Component {
  state = {
    classes: [],
    matieres: [],
    user: [],
    users: [],
    courses: [],
    exercices: [],
  };

  unsubscribeFromClasses = null;
  unsubscribeFromMatieres = null;
  unsubscribeFromCourses = null;
  unsubscribeFromExercices = null;
  unsubscribeFromUsers = null;

  componentDidMount = () => {
    this.unsubscribeFromClasses = firestore
      .collection("classes")
      .onSnapshot((snapshot) => {
        const classes = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ classes });
        // const classesdata = [];
        // classes.forEach((classe) => classesdata.push(classe));
        localStorage.setItem("classes", JSON.stringify(classes));

        // localStorage.removeItem("classes");
      });
    this.unsubscribeFromCourses = firestore
      .collection("cours")
      .onSnapshot((snapshot) => {
        const courses = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ courses });
      });
    this.unsubscribeFromExercices = firestore
      .collection("exercices")
      .onSnapshot((snapshot) => {
        const exercices = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ exercices });
      });
    this.unsubscribeFromMatieres = firestore
      .collection("matieres")
      .onSnapshot((snapshot) => {
        const matieres = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ matieres });
      });

    this.unsubscribeFromUsers = firestore
      .collection("users")
      .onSnapshot((snapshot) => {
        const users = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ users });
        localStorage.setItem(
          "students",
          JSON.stringify(users.filter((user) => user.type === "eleve"))
        );
      });
  };

  componentWillUnmount() {
    this.unsubscribeFromClasses();
    this.unsubscribeFromMatieres();
    this.unsubscribeFromCourses();
    this.unsubscribeFromExercices();
    this.unsubscribeFromUsers();
  }

  render() {
    const { classes, users, matieres, exercices, courses } = this.state;
    const { children } = this.props;
    const updateUser = this.updateUser;
    const teachers = users.filter((user) => user.type === "professeur");
    const students = users.filter((user) => user.type === "eleve");
    return (
      <DataContext.Provider
        value={{
          classes,
          teachers,
          students,
          updateUser,
          matieres,
          exercices,
          courses,
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}
export default DataProvider;
