import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { storage } from "../utils/firebase.js";

export const uploadFile = async (path, file) => {
    let storageRef = ref(storage, `${path}/images/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
}