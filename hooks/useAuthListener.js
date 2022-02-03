import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import app from '../lib/firebase';
import { FirebaseContext } from '../context/FirebaseContext';
import { setCookies } from 'cookies-next';
import { removeCookies } from 'cookies-next';
const jwt = require('jsonwebtoken');
const auth = getAuth(app);

//*In localStorage data has to converted to String and then it has to be stored
export default function useAuthListener() {
  const [user, setAuthUser] = useState(null);
  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { currentUser } = auth;
        localStorage.setItem('connect_authUser', JSON.stringify(currentUser));
        let token = jwt.sign(
          { uid: currentUser?.uid, email: currentUser?.email },
          process.env.JWT_SECRET
        );
        setCookies('connect_auth_cookie', token, {
          domain: 'localhost',
          sameSite: true,
          secure: true,
        });
        setAuthUser(currentUser);
      } else {
        // User is signed out
        removeCookies('connect_auth_cookie');
        localStorage.removeItem('connect_authUser');
        setAuthUser(null);
      }
    });
  }, [firebaseContext]);
  return user;
}
