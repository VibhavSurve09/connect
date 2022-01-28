import { useEffect, useState } from 'react';
import { getUserDataById } from '../services/firebase';

export const useUser = (userId) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (userId) {
      const data = getUserDataById(userId);
      setUserData(data);
    }
  }, [userId]);
  return userData;
};
