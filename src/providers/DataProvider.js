import React, { Component, createContext } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

export const DataContext = createContext();

class DataProvider extends Component {
  state = { classes: [], matieres: [], user: [], users: [] };

  unsubscribeFromClasses = null;
  unsubscribeFromMatieres = null;
  unsubscribeFromUsers = null;

  componentDidMount = () => {
    this.unsubscribeFromClasses = firestore
      .collection("classes")
      .onSnapshot((snapshot) => {
        const classes = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ classes });
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
      });
  };

  componentWillUnmount() {
    this.unsubscribeFromClasses();
    this.unsubscribeFromMatieres();
    this.unsubscribeFromUsers();
  }

  render() {
    const { classes, users, matieres } = this.state;
    const { children } = this.props;
    const updateUser = this.updateUser;
    const teachers = users.filter((user) => user.type === "professeur");
    const students = users.filter((user) => user.type === "eleve");
    return (
      <DataContext.Provider
        value={{ classes, teachers, students, updateUser, matieres }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}
export default DataProvider;
