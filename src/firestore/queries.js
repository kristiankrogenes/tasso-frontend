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


export const updateUserDoc = async (props) => {
    let successfullUpdate = false;
    console.log("KJØH", doc(db, "golf_courses", "9vy4hnLTM25nVuhmbPOv").id);
    const userRef = doc(db, "users", props.uid);
    try {
        await updateDoc(userRef, {
            name: props.name,
            hcp: props.hcp,
            home_club: doc(db, "golf_courses", props.club)
        });
        console.log("Document updated with ID: ", userRef.id);
        successfullUpdate = true;
    } catch (e) {
        console.error("Error updating document: ", e);
    }
    return successfullUpdate;
};