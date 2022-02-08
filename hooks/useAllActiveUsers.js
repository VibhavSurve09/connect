import { useEffect, useState } from 'react';
import { socketForChats } from '../server';

export const useAllActiveUsers = () => {
  const [allActiveUsers, setAllActiveUsers] = useState([]);

  const initUserProperties = (user) => {
    user.self = socketForChats.uid === user.uid;
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    socketForChats.on('user_connected', (user) => {
      console.log('Updating user');
      initUserProperties(user);
      //!This may cause a bug
      setAllActiveUsers([...allActiveUsers, user]);
    });
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
    socketForChats.on('user_disconnected', (id) => {
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
    socketForChats.on('private_message', ({ from, message }) => {
      console.log('message', message);
      var updateForMessage = allActiveUsers.map((user) =>
        user.uid === from
          ? {
              ...user,
              messages: user.messages.push({ message, fromSelf: false }),
              hasNewMessages: true,
            }
          : user
      );

      setAllActiveUsers(updateForMessage);
    });
  }, [allActiveUsers, setAllActiveUsers]);
  return { allActiveUsers, setAllActiveUsers };
};
