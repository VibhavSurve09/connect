import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import app from '../lib/firebase';
import { FirebaseContext } from '../context/FirebaseContext';
const auth = getAuth(app);

//*In localStorage data has to converted to String and then it has to be stored
export default function useAuthListener() {
  const [user, setAuthUser] = useState(null);
  const firebaseContext = useContext(FirebaseContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(
          localStorage.setItem('connect_authUser', JSON.stringify(auth))
        );
        setAuthUser(auth);
      } else {
        // User is signed out
        localStorage.removeItem('connect_authUser');
        setAuthUser(null);
      }
    });
    return () => {}; //clean up function
  }, [firebaseContext]);
  return user;
}
