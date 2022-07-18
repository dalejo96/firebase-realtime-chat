import firebase from "./firebase";

import {
  getAuth,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const auth = getAuth(firebase);

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, googleProvider);
    window.location.href = "/chat";
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};
