import { useEffect, useState } from 'react';
import { socketForChats } from '../server';

export const useAllActiveUsers = () => {
  const [allActiveUsers, setAllActiveUsers] = useState({
    users: [],
    count: 0,
  });
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const initUserProperties = (user) => {
      user.self = socketForChats.id === user.uid;
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    };
    socketForChats.on('users', (payload) => {
      setAllActiveUsers({ users: payload, count: payload.length });
      payload.forEach((user) => {
        initUserProperties(user);
      });
    });
    allActiveUsers.users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.userData.userName < b.userData.userName) return -1;
      return a.userData.userName > b.userData.userName ? 1 : 0;
    });
  });
  return allActiveUsers;
};
