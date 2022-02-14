import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import {
  getDocs,
  doc,
  query,
  where,
  addDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../constants/firebase';
import { userCollectionRef } from '../constants/firebase';
// eslint-disable-next-line react-hooks/rules-of-hooks
let path;
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
  path = userRef.id;
};

export const doesUserNameExist = async (userName) => {
  const q = query(userCollectionRef, where('userName', '==', userName));
  const userSS = await getDocs(q);
  return userSS.empty ? true : false;
};

export const getUserDataByUserName = async (userName) => {
  //*searches for the user having uid passed in "user" collection
  const userQuery = query(userCollectionRef, where('userName', '==', userName));
  const userSnapShot = await getDocs(userQuery);
  const userData = [];
  userSnapShot.forEach((doc) => {
    userData.push({ ...doc.data(), docId: doc.id });
  });
  return userData;
};

//Merge College Data
export const mergeData = (data) => {
  const ref = doc(db, 'users', path);
  setDoc(ref, data, { merge: true });
  path = null;
};

//Check if user is in my following and followers used in useALlactiveUser hook
export const isUserMyFriend = async (selfUid, friendUid) => {
  let isFollowing;
  let isFollower;
  const q = query(userCollectionRef, where('uid', '==', selfUid));
  const userSnapShot = await getDocs(q);
  const user = [];
  userSnapShot.forEach((doc) => {
    user.push({ ...doc.data(), id: doc.id });
  });
  if (user[0].following?.length > 0 && user[0].followers?.length > 0) {
    isFollowing = user[0].following.includes(friendUid);
    isFollower = user[0].followers.includes(friendUid);
    return isFollower && isFollowing ? true : false;
  } else {
    return false;
  }
};

//Update lastseen
export const updateLastSeen = async (ref, timestamp) => {
  const userRef = doc(db, 'users', ref);
  await updateDoc(userRef, {
    lastSeen: timestamp,
  });
};
