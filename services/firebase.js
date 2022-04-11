import {
  uploadBytes,
  ref,
  getDownloadURL,
  getStorage,
  listAll,
} from "firebase/storage";
import {
  getDocs,
  doc,
  query,
  where,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { postsReff } from "../constants/firebase";
import { db, projectsCollectionRef, storage } from "../constants/firebase";
import { userCollectionRef } from "../constants/firebase";
// eslint-disable-next-line react-hooks/rules-of-hooks
let path;
export const uploadPhoto = async (uid, profilePicture) => {
  const imgRef = ref(storage, `profilePictures/${uid}.png`);
  const snapshot = await uploadBytes(imgRef, profilePicture);
  const uploadedUrl = await getDownloadURL(imgRef);
  return uploadedUrl;
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
  path = userRef.id;
  return path;
};

export const doesUserNameExist = async (userName) => {
  const q = query(userCollectionRef, where("userName", "==", userName));
  const userSS = await getDocs(q);
  return userSS.empty ? true : false;
};

export const getUserDataByUserName = async (userName) => {
  //*searches for the user having uid passed in "user" collection
  const userQuery = query(userCollectionRef, where("userName", "==", userName));
  const userSnapShot = await getDocs(userQuery);
  const userData = [];
  userSnapShot.forEach((doc) => {
    userData.push({ ...doc.data(), docId: doc.id });
  });
  return userData;
};

//Merge College Data
export const mergeData = (data) => {
  const ref = doc(db, "users", path);
  setDoc(ref, data, { merge: true });
  path = null;
};

//Check if user is in my following and followers used in useALlactiveUser hook
export const isUserMyFriend = async (selfUid, friendUid) => {
  let isFollowing;
  let isFollower;
  const q = query(userCollectionRef, where("uid", "==", selfUid));
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
  const userRef = doc(db, "users", ref);
  await updateDoc(userRef, {
    lastSeen: timestamp,
  });
};

export const handleFollowUser = async (myDocId, suggestedDocId) => {
  let userRef, myData, myFollowing, myId;
  let suggestedUserRef, suggUserData, suggUserFollowers, userId;
  if (myDocId) {
    userRef = doc(db, "users", myDocId);
    myData = await getDoc(userRef);
    myFollowing = myData?.data().following;
    myId = myData?.data().uid;
  }
  if (suggestedDocId) {
    suggestedUserRef = doc(db, "users", suggestedDocId);
    suggUserData = await getDoc(suggestedUserRef);
    suggUserFollowers = suggUserData?.data().followers;
    userId = suggUserData?.data().uid;
  }
  if (myId && userId) {
    let oldFollower, oldFollowing;
    oldFollowing = myFollowing.includes(userId);
    if (!oldFollowing) {
      myFollowing.push(userId);
      await updateDoc(userRef, {
        following: myFollowing,
      });
    } else {
      return true;
    }
    oldFollower = suggUserFollowers.includes(myId);
    if (!oldFollower) {
      suggUserFollowers.push(myId);

      await updateDoc(suggestedUserRef, {
        followers: suggUserFollowers,
      });
    } else {
      return;
    }
  }
};

export const isUserInMyFollowingList = async (senderId, recUid) => {
  if ((senderId, recUid)) {
    const ref = doc(db, "users", senderId);
    const data = await getDoc(ref);
    const { following } = data.data();
    return following.includes(recUid);
  }
};

export const removeFriend = async (senderDocId, removeUserUID) => {
  const userData = await getUserDataById(removeUserUID);
  const { docId } = userData[0];
  const ref = doc(db, "users", senderDocId);
  const removeUserRef = doc(db, "users", docId);
  const removeUserData = await getDoc(removeUserRef);
  const { followers } = removeUserData.data();
  const data = await getDoc(ref);
  const { following, uid } = data.data();
  let newFollowingList = following.filter((id) => id !== removeUserUID);
  let newFollowersList = followers.filter((id) => uid !== id);
  await updateDoc(ref, {
    following: newFollowingList,
  });
  await updateDoc(removeUserRef, {
    followers: newFollowersList,
  });
};

export const editUserAbout = async (docId, newBio) => {
  if (newBio.trim() != "") {
    const ref = doc(db, "users", docId);
    await updateDoc(ref, {
      bio: newBio,
    });
  }
};

export const getAllProfilePics = () => {
  const storage = getStorage();
  const listRef = ref(storage, "profilePictures");
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        console.log("Fo ", folderRef);
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log("I", itemRef);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
    });
};

export const doIFollowTheUser = async (docId, uid) => {
  const ref = doc(db, "users", docId);
  const userData = await getDoc(ref);
  const { followers } = userData.data();
  // console.log(followers.includes(uid));
  return followers.includes(uid);
};

export const addProject = async (projectData) => {
  const projectRef = await addDoc(projectsCollectionRef, projectData);

  const userData = await getUserDataById(projectData.uid);
  const userRef = doc(db, "users", userData[0]?.docId);
  const data = await getDoc(userRef);
  let oldRefs = data.data().projectsRef;
  oldRefs.push(projectRef.id);
  await updateDoc(userRef, {
    projectsRef: oldRefs,
  });
};

export const getProjects = async (docId) => {
  const ref = doc(db, "projects", docId);
  const data = await getDoc(ref);
  const project = data.data();
  return project;
};

export const updateUserNameAndCollege = async (docId, toUpdateData) => {
  const ref = doc(db, "users", docId);
  const userData = await getDoc(ref);
  let { userName, collegeName } = userData.data();
  let checkOldUserName = await doesUserNameExist(toUpdateData.userName);
  if (
    (checkOldUserName || toUpdateData.userName === userName) &&
    toUpdateData.userName.trim() != ""
  ) {
    updateDoc(ref, {
      userName: toUpdateData.userName,
      collegeName: toUpdateData.college,
    });
    return true;
  } else {
    return false;
  }
};

export const savePost = async (projectData, userDocId) => {
  const post = await addDoc(postsReff, projectData);
  const ref = doc(db, "users", userDocId);
  let data = await getDoc(ref);
  let { postsRef } = data.data();
  postsRef.push(post.id);
  updateDoc(ref, {
    postsRef: postsRef,
  });
  return post.id;
};

export const getPosts = async (docId) => {
  const ref = doc(db, "posts", docId);
  const data = await getDoc(ref);
  const post = data.data();
  return post;
};

export const getCountOfUsers = async () => {
  const querySnapshot = await getDocs(userCollectionRef);
  let count = [];
  querySnapshot.forEach((doc) => {
    count.push({ ...doc.data() });
  });
  return count.length;
};

export const getCountOfPosts = async () => {
  const querySnapshot = await getDocs(postsReff);
  let count = [];
  querySnapshot.forEach((doc) => {
    count.push({ ...doc.data() });
  });
  return count.length;
};

export const getCountOfProjects = async () => {
  const querySnapshot = await getDocs(projectsCollectionRef);
  let count = [];
  querySnapshot.forEach((doc) => {
    count.push({ ...doc.data() });
  });
  return count.length;
};

export const increaseLikeCountInFB = async (docId) => {
  const ref = doc(db, "posts", docId);
  const data = await getDoc(ref);
  let { interested } = data.data();
  updateDoc(ref, {
    interested: interested + 1,
  });
};
export const decreaseLikeCountInFB = async (docId) => {
  const ref = doc(db, "posts", docId);
  const data = await getDoc(ref);
  let { interested } = data.data();
  updateDoc(ref, {
    interested: interested - 1,
  });
};

export const updatePhotoURL = async (docId, newPhotoURL) => {
  const ref = doc(db, "users", docId);
  updateDoc(ref, {
    photoURL: newPhotoURL,
  });
};

export const getUserByDocId = async (docId) => {
  const ref = doc(db, "users", docId);
  const dataDoc = await getDoc(ref);
  const data = dataDoc.data();
  return data;
};

export const deletePost = async (docId) => {};

export const editProjectFB = async (docId, project) => {
  console.log("What", project);
  const ref = doc(db, "projects", docId);
  updateDoc(ref, {
    title: project.projectName,
  });
  updateDoc(ref, {
    link: project.projectLink,
  });
  updateDoc(ref, {
    description: project.projectDis,
  });
};

export const addCommentToFB = async (commentObj, docId) => {
  const ref = doc(db, "posts", docId);
  const dataDoc = await getDoc(ref);
  let { comments } = dataDoc.data();
  comments.push(commentObj);
  updateDoc(ref, {
    comments: comments,
  });
};

export const editPostFB = async (docId, content, interactive) => {
  const ref = doc(db, "posts", docId);
  const dataDoc = await getDoc(ref);
  updateDoc(ref, {
    postContent: content,
  });
  updateDoc(ref, {
    edit: true,
  });
  updateDoc(ref, {
    timeStamp: serverTimestamp(),
  });
  updateDoc(ref, {
    isInteractive: interactive,
  });
};

export const deleteProfileFB = async (docId) => {
  let user = await getUserByDocId(docId);
  let { postsRef, projectsRef } = user;
  for (let i = 0; i < postsRef.length; i++) {
    await deleteDoc(doc(db, "posts", postsRef[i]));
  }
  for (let i = 0; i < projectsRef.length; i++) {
    await deleteDoc(doc(db, "projects", projectsRef[i]));
  }
};
