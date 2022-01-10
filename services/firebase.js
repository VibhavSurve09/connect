import { getStorage, ref, uploadBytes } from 'firebase/storage';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  query,
  where,
} from 'firebase/firestore';
import app from '../lib/firebase';
const storage = getStorage(app);
const db = getFirestore(app);
const userCollectionRef = collection(db, 'users');
export const uploadPhoto = (displayName, profilePicture) => {
  const imgRef = ref(storage, `${displayName}.png`);
  uploadBytes(imgRef, displayName)
    .then((res) => {
      console.log('Image Uploading done ', res);
    })
    .catch((err) => {
      console.log('Err..', err);
    });
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
