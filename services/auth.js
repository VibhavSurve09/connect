import {
  getFirestore,
  collection,
  getDocs,
  doc,
  query,
  where,
} from 'firebase/firestore';

import app from '../lib/firebase';
const db = getFirestore(app);
const userCollectionRef = collection(db, 'users');
const prefrencesCollectionRef = collection(db, 'Prefrences');

export const getUserDataById = async (uid) => {
  const userQuery = query(userCollectionRef, where('uid', '==', uid));
  const userSnapShot = await getDocs(userQuery);
  const userData = [];
  userSnapShot.forEach((doc) => {
    userData.push({ ...doc.data(), docId: doc.id });
  });
  return userData;
};
