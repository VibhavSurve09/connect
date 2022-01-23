import { uploadBytes, ref } from "firebase/storage";
import { getDocs, doc, query, where, addDoc } from "firebase/firestore";
import { storage } from "../constants/firebase";
import { userCollectionRef } from "../constants/firebase";
export const uploadPhoto = (displayName, profilePicture) => {
  const imgRef = ref(storage, `${displayName}.png`);
  uploadBytes(imgRef, displayName)
    .then((res) => {
      console.log("Image Uploading done ", res);
    })
    .catch((err) => {
      console.log("Err..", err);
    });
};
export const getUserDataById = async (uid) => {
  //*searches for the user having uid passed in "user" collection
  const userQuery = query(userCollectionRef, where("uid", "==", uid));
  const userSnapShot = await getDocs(userQuery);
  const userData = [];
  userSnapShot.forEach((doc) => {
    userData.push({ ...doc.data(), docId: doc.id });
  });
  return userData;
};

export const addUser = async (userData) => {
  const userRef = await addDoc(userCollectionRef, userData);
};
