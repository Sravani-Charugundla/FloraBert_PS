// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_mzqURfQh3qVzRgVrWqNY4tW2CpjapXU",
  authDomain: "florabertauth.firebaseapp.com",
  projectId: "florabertauth",
  storageBucket: "florabertauth.appspot.com",
  messagingSenderId: "269755777090",
  appId: "1:269755777090:web:ea50961b1bb9e89059eddb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);