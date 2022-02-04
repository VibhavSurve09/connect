import { useEffect, useState } from 'react';
import { getUserDataById } from '../services/firebase';

//Hook for active users data
export const useUser = (userId) => {
  const [userData, setUserData] = useState([{ data: [], loading: false }]);
  useEffect(() => {
    if (userId) {
      setUserData({ data: null, loading: true });
      const data = getUserDataById(userId).then((d) => {
        setUserData({ data: d, loading: false });
      });
    }
  }, [userId]);
  return userData;
};
