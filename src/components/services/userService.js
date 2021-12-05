import { db } from "../utils/firebase.js";
import { collection, addDoc, updateDoc, setDoc, getDoc, serverTimestamp, doc, arrayUnion } from "@firebase/firestore";

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

export const updateUserPosts = (id, data) => {
    const userRef = doc(db, 'users', id);


    return updateDoc(userRef, {
        posts: arrayUnion(data)
    });

}


export const addUserPost = (id, postId) => {
    return updateDoc((doc(db, 'users', id)), {

        posts: arrayUnion(`testArray`)

    });
}