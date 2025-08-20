// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRDBWioxARY_tThlOumEa29cX3skMF9sA",
  authDomain: "uitscivil-71218.firebaseapp.com",
  projectId: "uitscivil-71218",
  storageBucket: "uitscivil-71218.firebasestorage.app",
  messagingSenderId: "493259268095",
  appId: "1:493259268095:web:2fce039137a5f5235311ca",
  measurementId: "G-0QFHBLYE3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
