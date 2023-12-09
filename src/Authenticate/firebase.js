// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiN-RfPKBd_i2U5r71TJWK9U99s-LuFtw",
  authDomain: "authenticatefbert.firebaseapp.com",
  projectId: "authenticatefbert",
  storageBucket: "authenticatefbert.appspot.com",
  messagingSenderId: "353348803429",
  appId: "1:353348803429:web:60f07eec13573d01435f8c",
  measurementId: "G-XB0DLE0NBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);


