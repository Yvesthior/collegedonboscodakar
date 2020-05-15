import React, { Component, createContext } from "react";
import { auth, firestore } from "../firebase";

export const UserContext = createContext({ user: null });

export default class UserProvider extends Component {
  state = { user: null };
  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        userRef.onSnapshot((snapshot) => {
          this.setState({ user: { uid: snapshot.id, ...snapshot.data() } });
        });
      }
      this.setState({ user: userAuth });
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { user } = this.state;
    const { children } = this.props;
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}
