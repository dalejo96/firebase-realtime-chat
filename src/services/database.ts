import { getDatabase, ref } from "firebase/database";

import firebase from "./firebase";

// Root reference
export const database = getDatabase(firebase);
export const databaseRef = ref(database);

// Child reference
export const friendsRef = ref(database, "friends");
