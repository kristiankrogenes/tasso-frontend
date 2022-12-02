import { db } from '../../firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, doc } from "firebase/firestore";

export const fetchUserDataFromFirestore = async (uid) => {
    const newData = await getDoc(doc(db, "users", uid));
    const courseData = await getDoc(doc(db, "golf_courses", newData.data().home_club.id));

    return {id: newData.id, name: newData.data().name, home_club: courseData.data().name, hcp: newData.data().hcp};
};

export const fetchGolfCoursesFromFireStore = async () => {
    const golfCoursesData = await getDocs(collection(db, "golf_courses"))
        .then(qsnap => qsnap.docs.map(doc => ({id: doc.id, ...doc.data()})));
    return golfCoursesData;
};