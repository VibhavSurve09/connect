import { useEffect, useState } from 'react';
import { getUserDataById } from '../services/firebase';

export const useUser = (userId) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (userId) {
      const data = getUserDataById(userId).then((data) => {
        setUserData(data);
      });
    }
  }, [userId]);
  return userData;
};
