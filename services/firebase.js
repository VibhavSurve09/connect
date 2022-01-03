import { getStorage, ref, uploadBytes } from 'firebase/storage';
import app from '../lib/firebase';
const storage = getStorage(app);

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
