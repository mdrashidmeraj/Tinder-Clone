import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCB6AQSGtLCDeX9yzCHK6aCW3mzUZrFiIk",
  authDomain: "tinder-clone-c4cd8.firebaseapp.com",
  projectId: "tinder-clone-c4cd8",
  storageBucket: "tinder-clone-c4cd8.appspot.com",
  messagingSenderId: "191404516350",
  appId: "1:191404516350:web:9a1f4ed5322686860cd6af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(); 

export {auth, db}