import app from '../lib/firebase';
import { getStorage } from '@firebase/storage';
import { collection, getFirestore } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
export const storage = getStorage(app);
export const db = getFirestore(app);
export const userCollectionRef = collection(db, 'users');
export const auth = getAuth(app);
