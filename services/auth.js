import {
  getFirestore,
  collection,
  getDocs,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import app from '../lib/firebase';
const db = getFirestore(app);
const userCollectionRef = collection(db, 'users');
const prefrencesCollectionRef = collection(db, 'prefrences');

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
