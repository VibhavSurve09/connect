/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { socketForChats } from '../server';
import produce from 'immer';

export const useAllActiveUsers = () => {
  const [allActiveUsers, setAllActiveUsers] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    socketForChats.on('user_connected', (user) => {
      const newUser = produce(allActiveUsers, (draft) => {
        for (let i = 0; i < allActiveUsers.length; i++) {
          if (draft[i].uid === user.uid) {
            draft[i].connected = true;
          }
          draft[i].hasNewMessages = false;
        }
      });
      setAllActiveUsers(newUser);
    });

    socketForChats.on('users', (users) => {
      const oldUser = produce(users, (draft) => {
        draft.forEach((u) => {
          u.messages.forEach((message) => {
            message.fromSelf = message.from === socketForChats.uid;
          });
          for (let i = 0; i < draft.length; i++) {
            if (draft[i].uid === u.uid) {
              {
                draft[i].connected = u.connected;
                draft[i].messages = u.messages;
              }
            }
          }
          u.self = u.uid === socketForChats.uid;
          u.hasNewMessages = false;
        });
      });
      setAllActiveUsers(oldUser);
      allActiveUsers.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.userData.userName < b.userData.userName) return -1;
        return a.userData.userName > b.userData.userName ? 1 : 0;
      });
    });
    socketForChats.on('user_disconnected', (id) => {
      const user = produce(allActiveUsers, (draft) => {
        draft.forEach((u) => {
          if (u.uid === id) {
            u.connected = false;
          }
        });
      });
      setAllActiveUsers(user);
    });
    return () => {
      socketForChats.off('user_connected');
      socketForChats.off('users');
      socketForChats.off('user_disconnected');
      socketForChats.off('private_message');
    };
  }, [allActiveUsers]);
  return { allActiveUsers, setAllActiveUsers };
};
