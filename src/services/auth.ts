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
    const authUser = await signInWithPopup(auth, googleProvider);
    return authUser;
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    window.location.href = "/login";
  } catch (error) {
    console.log(error);
  }
};
