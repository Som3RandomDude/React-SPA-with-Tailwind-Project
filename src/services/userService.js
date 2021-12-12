import { db } from "../utils/firebase.js";
import { collection, updateDoc, getDocs, setDoc, getDoc, serverTimestamp, doc, arrayUnion, arrayRemove, query, orderBy, limit, increment } from "@firebase/firestore";
let imageRef="https://firebasestorage.googleapis.com/v0/b/react-spa-project-9f706.appspot.com/o/users%2Fdefault.png?alt=media&token=b6225268-cf55-433a-89d8-65379632cfbc";

export const storeUser = (firstName, lastName, email, id) => {
   
    return setDoc(doc(db, 'users', id), {
        firstname: firstName,
        lastname: lastName,
        email: email,
        image: imageRef,
        date: serverTimestamp(),
        posts: [],
        postCount: Number(0)
    });


}

export const getUser = (id) => {
    return getDoc(doc(db, 'users', id));
}



export const getTopUsers = (numberOfUsers) => {
    const queryOptions = query(collection(db, 'users'), orderBy('postCount', 'desc'), limit(numberOfUsers));
    return getDocs(queryOptions);
}

export const createUserPost = (id, data) => {
    const userRef = doc(db, 'users', id);


    return updateDoc(userRef, {
        posts: arrayUnion(data),
        postCount: increment(1)
    });

}

export const updateUserPhoto = (id, image) => {
    const userRef = doc(db, 'users', id);


    return updateDoc(userRef, {
        image
    });

}
export const deleteUserPost = (id, data) => {
    const userRef = doc(db, 'users', id);


    return updateDoc(userRef, {
        posts: arrayRemove(data),
        postCount: increment(-1)
    });

}