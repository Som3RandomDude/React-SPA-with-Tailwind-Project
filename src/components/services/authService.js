import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const register = (email, password) => {

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const user = userCredential.user;

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

        });
}

const login = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const user = userCredential.user;

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

        });
}