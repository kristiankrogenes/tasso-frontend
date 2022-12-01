// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPRTGMRsiIuvxPLznXmQ7-8zauvEzi1Ik",
  authDomain: "tasso-back9.firebaseapp.com",
  projectId: "tasso-back9",
  storageBucket: "tasso-back9.appspot.com",
  messagingSenderId: "468361767022",
  appId: "1:468361767022:web:e8c5db0bd89126ba491e7f",
  measurementId: "G-ZVTNVXWZ8R"
};

// Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app();
// }
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };

const db = getFirestore(app);
export { db };


// const analytics = getAnalytics(app);