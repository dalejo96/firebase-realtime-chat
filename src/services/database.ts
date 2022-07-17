import { getDatabase, ref } from "firebase/database";

import firebase from "./firebase";

const database = getDatabase(firebase);

export const todosRef = ref(database, "todos");
