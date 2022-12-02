import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

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

let app;
let auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}

const db = getFirestore(app);

export { auth, db };