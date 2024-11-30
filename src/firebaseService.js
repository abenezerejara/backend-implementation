//TODO: implement the CRUD functions.
//NOTE: this is responsible for the communication between backend and database

import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import database from "../src/Firebase.js"; // Import the initialized Firestore instance

//function to send data to the database.
export async function saveStudents(newApplication) {
    try {
        const docRef = await addDoc(collection(database, "Students"), newApplication);
        //creates an object that includes the newly created document's ID in the collection
        //along with the data of the new application.
        return { id: docRef.id, ...newApplication };
    } catch (e) {
        console.error("Error adding document:", e);
        throw e;
    }
}

//function to get data from the database.
export async function fetchStudents() {
    try {
        const querySnapshot = await getDocs(collection(database, "Students"));
        return querySnapshot.docs.map((doc) => ({ id: doc.id,key:doc.id, ...doc.data() }));
    } catch (e) {
        console.error("Error fetching documents:", e);
        throw e;
    }
}

//function to delete specific data from the database.
export async function deleteStudents(id) {
    try {
        const docRef = doc(database, "Students", id);
        await deleteDoc(docRef);
    } catch (e) {
        console.error("Error deleting document:", e);
        throw e;
    }
}
