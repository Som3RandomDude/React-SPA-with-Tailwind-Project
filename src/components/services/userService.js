import { db } from "../utils/firebase.js";
import { collection, addDoc, updateDoc, setDoc, getDoc, serverTimestamp, doc } from "@firebase/firestore";

export const storeUser = (firstName, lastName, email, id) => {
    return setDoc(doc(db, 'users', id), {
        firstname: firstName,
        lastname: lastName,
        email: email,
        date: serverTimestamp(),
        posts: []
    });


}

export const getUser = (id) => {
    return getDoc(doc(db, 'users', id));
}

export const updateUser = (id) => {
    return updateDoc((doc(db, 'users', id)), {
        
    })
}