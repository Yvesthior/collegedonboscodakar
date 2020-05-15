import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCo92dqvr9lKHQFVXmhcpxteTigUs-77Uw",
  authDomain: "donbosco-818dd.firebaseapp.com",
  databaseURL: "https://donbosco-818dd.firebaseio.com",
  projectId: "donbosco-818dd",
  storageBucket: "donbosco-818dd.appspot.com",
  messagingSenderId: "247175658617",
  appId: "1:247175658617:web:29a4a0e39bc89ead23a8a8",
  measurementId: "G-SP7GCCPQH8",
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signInWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
export const signOut = () => auth.signOut();

window.firebase = firebase;

export const createUserProfileDocument = async (user) => {
  if (!user) return;
  // Get a reference to the place in the database where the document might be
  const userRef = firestore.doc(`users/${user.user.uid}`);

  //Go and Fetch document from that location
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, photoURL } = user.user;
    const { nom, prenom, email, matiere, type, phoneNumber } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        phoneNumber,
        displayName,
        photoURL,
        createdAt,
        nom,
        prenom,
        email,
        matiere,
        type,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }
};

// export const getUserDocument = async (uid) => {
//   if (!uid) return null;

//   try {
//     return firestore.collection("users").doc(`${uid}`);
//   } catch (error) {
//     console.error("Error while fetching user", error.message);
//   }
// };

export default firebase;
