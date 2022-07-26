import { getDatabase, ref } from "firebase/database";

import firebase from "./firebase";

// Root reference
export const database = getDatabase(firebase);

// Child reference
export const friendsRef = ref(database, "friends");
