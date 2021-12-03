import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const register = (email, password) => {

    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)


}

export const login = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)


}

