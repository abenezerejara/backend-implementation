// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKl2vY7dzDsJ8epoAEKlHT_nkr0ZpivnI",
  authDomain: "backend-implmentation.firebaseapp.com",
  projectId: "backend-implmentation",
  storageBucket: "backend-implmentation.firebasestorage.app",
  messagingSenderId: "1017185548217",
  appId: "1:1017185548217:web:6d71ef6034916400056868"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export default database;