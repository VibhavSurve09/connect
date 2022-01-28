import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { getDocs, doc, query, where, addDoc } from 'firebase/firestore';
import { storage } from '../constants/firebase';
import { userCollectionRef } from '../constants/firebase';
import { async } from '@firebase/util';
export const uploadPhoto = async (displayName, profilePicture) => {
  const imgRef = ref(storage, `${displayName}.png`);
  const snapshot = await uploadBytes(imgRef, displayName);
  const uploadedUrl = await getDownloadURL(imgRef);
  return uploadedUrl;
};
export const getUserDataById = async (uid) => {
  //*searches for the user having uid passed in "user" collection
  const userQuery = query(userCollectionRef, where('uid', '==', uid));
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

export const doesUserNameExist = async (userName) => {
  const q = query(userCollectionRef, where('userName', '==', userName));
  const userSS = await getDocs(q);
  return userSS.empty ? true : false;
};
