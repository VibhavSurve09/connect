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
const userCollectionRef = collection(db, 'Users');
const prefrencesCollectionRef = collection(db, 'Prefrences');

export const doesUserDataExist = async (emaiAddress) => {
  const userQuery = query(
    userCollectionRef,
    where('emailAddress', '==', emaiAddress)
  );
  const userSnapShot = await getDocs(userQuery);

  return userSnapShot.empty ? true : false;
};

export const doesUserNameExist = (userName) => {};
