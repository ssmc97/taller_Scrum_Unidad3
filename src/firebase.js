import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDSw9JIXxT71iVvFDmSa7huA5FJX_BQ82c",
    authDomain: "tallerscrum3.firebaseapp.com",
    projectId: "tallerscrum3",
    storageBucket: "tallerscrum3.appspot.com",
    messagingSenderId: "180291636304",
    appId: "1:180291636304:web:e5b5a77e77850be954d555"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}