
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAOdvAKu07jcUhurTwS1m9YYXktxidYWq4",
    authDomain: "react-spa-project-9f706.firebaseapp.com",
    projectId: "react-spa-project-9f706",
    storageBucket: "react-spa-project-9f706.appspot.com",
    messagingSenderId: "215822673291",
    appId: "1:215822673291:web:f2076e26c2d1e07f7e7b8e",
    measurementId: "G-GJG2KEB37R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);