import { db } from "../utils/firebase.js";
import { collection, query, where,Timestamp, addDoc, setDoc, deleteDoc, getDoc, getDocs, updateDoc, serverTimestamp, doc, limit, orderBy } from "@firebase/firestore";



export const createPost = (title, description, content, image, creatorId) => {
    return addDoc(collection(db, 'posts'), {
        title,
        description,
        content,
        image,
        creatorId,
        date: serverTimestamp(),
        likes: []
    });


}

export const updatePost = (title, description, content, id) => {
    return updateDoc(doc(db, 'posts', id), {
        title,
        description,
        content,
        date: serverTimestamp(),

    });


}

export const getPost = (id) => {
    return getDoc(doc(db, 'posts', id))
}

export const getAllPosts = async () => {
    return getDocs(collection(db, "posts"));
}

export const getLatestPosts = (id, numberOfPosts) => {
    const queryOptions = query(collection(db, 'posts'), orderBy('date', 'asc'), limit(numberOfPosts));
    return getDocs(queryOptions);
}

export const deletePort = (id) => {
    return deleteDoc(doc(db, 'posts', id));
}