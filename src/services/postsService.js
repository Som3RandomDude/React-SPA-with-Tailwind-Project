import { db } from "../utils/firebase.js";
import { collection, query, where, arrayUnion, arrayRemove, addDoc, increment, deleteDoc, getDoc, getDocs, updateDoc, serverTimestamp, doc, limit, orderBy } from "@firebase/firestore";



export const createPost = (title, description, category, content, image, creatorId) => {
    return addDoc(collection(db, 'posts'), {
        title,
        description,
        category,
        content,
        image,
        creatorId,
        date: serverTimestamp(),
        likes: [],
        likesCount: 0
    });


}

export const updatePost = (title, description, category, content, image, id) => {
    return updateDoc(doc(db, 'posts', id), {
        title,
        description,
        category,
        content,
        image,

    });


}

export const likePost = (id, data) => {
    const postRef = doc(db, 'posts', id);


    return updateDoc(postRef, {
        likes: arrayUnion(data),
        dislikes: arrayRemove(data),
        likesCount: increment(1)
    });

}
export const dislikePost = (id, data) => {
    const postRef = doc(db, 'posts', id);


    return updateDoc(postRef, {
        likes: arrayRemove(data),
        dislikes: arrayUnion(data),
        likesCount: increment(-1)
    });

}

export const containsUser = (postId, userId, check) => {

    const queryOptions = query(collection(db, 'posts'), where(check, "array-contains", userId));
    return getDocs(queryOptions);
}



export const getPost = (id) => {
    return getDoc(doc(db, 'posts', id))
}

export const getAllPosts = async () => {

    return getDocs(collection(db, "posts"));

}

export const getLatestPosts = (numberOfPosts, order) => {
    const queryOptions = query(collection(db, 'posts'), orderBy('date', order), limit(numberOfPosts));
    return getDocs(queryOptions);
}
export const orderPosts = (order) => {
    const queryOptions = query(collection(db, 'posts'), orderBy('date', order));
    return getDocs(queryOptions);
}
export const orderPostsByCategory = (category) => {
    const queryOptions = query(collection(db, 'posts'), where("category", "==", category));
    return getDocs(queryOptions);
}
export const deletePost = (id) => {
    return deleteDoc(doc(db, 'posts', id));
}