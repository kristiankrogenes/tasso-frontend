import { auth, db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export const LoginFromWelcomeScreen = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Successfully logged in with:', user.uid, user.email);
        })
        .catch(error => alert(error.message));
}

const addNewUserDoc = async (uid, name, hcp, homeClub) => {
    try {
        const docRef = await setDoc(doc(db, `users/${uid}`), {
            name: name, 
            hcp: hcp, 
            home_club: doc(db, "golf_courses", homeClub)
        });
        console.log("Succesfully added user document written with ID: ", docRef);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const RegisterNewUser = (email, password, name, hcp, homeClub) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Succesfully registered new account with:', user.uid, user.email);
            addNewUserDoc(user.uid, name, hcp, homeClub);
            LoginFromWelcomeScreen(email, password);
        })
        .catch(error => alert(error.message));
}