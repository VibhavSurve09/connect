import React, { useContext, useEffect, useState } from 'react';
import ActiveUserCount from '../../components/Chats/ActiveUserCount';
import Sidebar from '../../components/Chats/Sidebar';

import { UserContext } from '../../context/User';
import { useAllActiveUsers } from '../../hooks/useAllActiveUsers';
import { useUser } from '../../hooks/useUser';
import { socketForChats } from '../../server';
export default function Chat() {
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  const { users, count } = useAllActiveUsers();

  if (!loading && data) {
    //AUID-Active user id
    socketForChats.auth = { userName: data.userName, auid: data.uid };
    socketForChats.connect();
  }
  useEffect(() => {
    socketForChats.on('connect', () => {
      users.forEach((user) => {
        if (user.self) {
          user.connected = true;
        }
      });
    });
  }, []);

  socketForChats.on('disconnect', () => {
    users.forEach((user) => {
      if (user.self) {
        user.connected = false;
      }
    });
  });
  // Now A Hook-<useALlActiveUsers
  // const initUserProperties = (user) => {
  //   user.self = socketForChats.id === user.id;
  //   user.connected = true;
  //   user.messages = [];
  //   user.hasNewMessages = false;
  // };
  // socketForChats.on('users', (payload) => {
  //   setNumberOfOnlineUsers(payload.length);
  //   setAllActiveUsers(payload);
  //   payload.forEach((user) => {
  //     initUserProperties(user);
  //   });
  // put the current user first, and sort by username
  console.log(users);
  return (
    <div className='flex flex-col'>
      <ActiveUserCount count={count} />
      {/* Sidebar div */}
      <Sidebar allActiveUsers={users} />
    </div>
  );
}
