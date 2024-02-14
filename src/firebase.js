import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD25YWCuaB_0wkLoZ7GSEIOuSAqKabnasU",
  authDomain: "mallproject-f2a7f.firebaseapp.com",
  projectId: "mallproject-f2a7f",
  storageBucket: "mallproject-f2a7f.appspot.com",
  messagingSenderId: "547305040508",
  appId: "1:547305040508:web:1a472231de6d44f652b7f9",
  measurementId: "G-0YLR4N6Y4M",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
