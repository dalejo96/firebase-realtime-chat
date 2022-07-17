import {initializeApp }from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBgVoIZDINpLe_9mqy_LgYe9jehdPwFZ_M",
  authDomain: "realtime-chat-1dcd2.firebaseapp.com",
  databaseURL: "https://realtime-chat-1dcd2-default-rtdb.firebaseio.com",
  projectId: "realtime-chat-1dcd2",
  storageBucket: "realtime-chat-1dcd2.appspot.com",
  messagingSenderId: "150658784262",
  appId: "1:150658784262:web:b3a3a75a3f32854115b787",
};

const app = initializeApp(firebaseConfig);

export default app;
