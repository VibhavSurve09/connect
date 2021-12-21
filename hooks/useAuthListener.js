import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import app from '../lib/firebase';

const auth = getAuth(app);
export default function useAuthListener() {
  const [user, setAuthUser] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('connect_authUser')
      : null
  );
  useEffect(() => {
    setAuthUser(localStorage.getItem('connect_authUser'));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(
          localStorage.setItem('connect_authUser', JSON.stringify(auth))
        );
      } else {
        // User is signed out
        localStorage.removeItem('connect_authUser');
        setAuthUser(null);
      }
    });
  }, [user]);
  return { user };
}
