import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase.js";

export const register = (email, password) => {


    return createUserWithEmailAndPassword(auth, email, password)


}

export const login = (email, password) => {

    return signInWithEmailAndPassword(auth, email, password)


}

