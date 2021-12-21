import { useEffect, useState } from 'react';
import { getUserDataById } from '../services/auth';
export const useUser = () => {
  const [activeUserData, setActiveUserData] = useState({});
  const [userCred, setUserCred] = useState({});
  useEffect(() => {
    //get the user details from localStorage
    const { currentUser } = JSON.parse(
      localStorage.getItem('connect_authUser')
    );
    setUserCred(currentUser);
    //as the data was stored in string format it had to be converted to JSON/Object
    async function getUserObjById() {
      const response = await getUserDataById(currentUser.uid);
      setActiveUserData(response);
    }
    if (currentUser.uid) {
      getUserObjById();
    }
  }, [userCred]);
  return activeUserData;
};
