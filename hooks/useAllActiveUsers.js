import { useEffect, useState } from 'react';
import { socketForChats } from '../server';

export const useAllActiveUsers = () => {
  const [allActiveUsers, setAllActiveUsers] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const initUserProperties = (user) => {
      user.self = socketForChats.id === user.uid;
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    };
    socketForChats.on('users', (payload) => {
      setAllActiveUsers(payload);
      payload.forEach((user) => {
        initUserProperties(user);
      });
    });
    // put the current user first, and sort by username
    allActiveUsers.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.userData.userName < b.userData.userName) return -1;
      return a.userData.userName > b.userData.userName ? 1 : 0;
    });
    socketForChats.on('user disconnected', (id) => {
      var updatedUsers = allActiveUsers.map((user) =>
        user.uid === id
          ? {
              ...user,
              connected: false,
            }
          : user
      );
      setAllActiveUsers(updatedUsers);
    });
  }, [allActiveUsers]);
  return { allActiveUsers, setAllActiveUsers };
};
