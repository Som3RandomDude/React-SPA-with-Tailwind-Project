import { db } from "../utils/firebase.js";
import { collection, addDoc, updateDoc, getDocs, setDoc, getDoc, serverTimestamp, doc, arrayUnion,arrayRemove, query, orderBy, limit, increment } from "@firebase/firestore";

export const storeUser = (firstName, lastName, email, id) => {
    return setDoc(doc(db, 'users', id), {
        firstname: firstName,
        lastname: lastName,
        email: email,
        date: serverTimestamp(),
        posts: [],
        postCount:Number(0)
    });


}

export const getUser = (id) => {
    return getDoc(doc(db, 'users', id));
}



export const getTopUsers = (numberOfUsers) => {
    const queryOptions = query(collection(db, 'users'), orderBy('postCount', 'asc'), limit(numberOfUsers));
    return getDocs(queryOptions);
}

export const createUserPost = (id, data) => {
    const userRef = doc(db, 'users', id);


    return updateDoc(userRef, {
        posts: arrayUnion(data),
        postCount: increment(1)
    });

}
export const deleteUserPost = (id, data) => {
    const userRef = doc(db, 'users', id);


    return updateDoc(userRef, {
        posts: arrayRemove(data),
        postCount: increment(-1)
    });

}