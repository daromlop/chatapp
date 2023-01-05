import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKJsvKbvRvMwyLOEadOPZD2OjHO7X0TCM",
  authDomain: "login-system-f6cc2.firebaseapp.com",
  projectId: "login-system-f6cc2",
  storageBucket: "login-system-f6cc2.appspot.com",
  messagingSenderId: "777499940702",
  appId: "1:777499940702:web:4bb409a299aa988812a1cf",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const db = firebaseApp.firestore();

export { auth, provider, db };
