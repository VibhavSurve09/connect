/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { socketForChats } from '../server';
import produce from 'immer';
import { getCookie } from 'cookies-next';
import { isUserMyFriend } from '../services/firebase';
const jwt = require('jsonwebtoken');
export const useAllActiveUsers = () => {
  const [allActiveUsers, setAllActiveUsers] = useState([]);
  useEffect(() => {
    let cookie = getCookie('connect_auth_cookie');
    let { uid } = jwt.decode(cookie, process.env.JWT_SECRET);
    console.log('My uid', uid);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    socketForChats.on('user_connected', async (user) => {
      //This is causing a bug
      let isFriend = await isUserMyFriend(uid, user.userData.auid);
      console.log('new', isFriend);
      if (isFriend) {
        const newUser = produce(allActiveUsers, (draft) => {
          for (let i = 0; i < allActiveUsers.length; i++) {
            if (draft[i].uid === user.uid) {
              draft[i].connected = true;
              return;
            }
            draft[i].hasNewMessages = false;
          }
        });
        setAllActiveUsers(newUser);
      }
    });

    socketForChats.on('users', async (users) => {
      const oldUser = produce(users, (draft) => {
        draft.forEach(async (u) => {
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
      //Only friends should be displayed to the user
      const onlyFriends = await produce(oldUser, async (draft) => {
        for (let i = 0; i < oldUser.length; i++) {
          let isFriend = await isUserMyFriend(uid, oldUser[i].userData.auid);
          if (!isFriend) {
            draft.splice(
              draft.findIndex((a) => a.uid === draft[i].uid),
              1
            );
          }
        }
      });
      setAllActiveUsers(onlyFriends);
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
