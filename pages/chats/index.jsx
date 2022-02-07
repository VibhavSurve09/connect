import React, { useContext, useEffect, useState } from 'react';
import ActiveUserCount from '../../components/Chats/ActiveUserCount';
import Sidebar from '../../components/Chats/Sidebar';

import { UserContext } from '../../context/User';
import { useAllActiveUsers } from '../../hooks/useAllActiveUsers';
import { useShowCount } from '../../hooks/useShowCount';
import { useUser } from '../../hooks/useUser';
import { socketForChats } from '../../server';
export default function Chat() {
  const activeUser = useContext(UserContext);
  console.log('In Chat');
  const { data, loading } = useUser(activeUser?.uid);
  const { allActiveUsers, setAllActiveUsers } = useAllActiveUsers();
  let count = useShowCount();
  useEffect(() => {
    const sessionID = localStorage.getItem('fetchChat');
    if (data) {
      //AUID-Active user id
      socketForChats.auth = {
        userName: data.userName,
        auid: data.uid,
        sessionID,
      };
      socketForChats.connect();
    }
  }, [data]);
  socketForChats.on('session', ({ sessionID, uid }) => {
    socketForChats.auth = { sessionID };
    localStorage.setItem('fetchChat', sessionID);
    socketForChats.uid = uid;
  });
  socketForChats.on('private_message', ({ from, message }) => {
    console.log('message', message);
    var updateForMessage = allActiveUsers.map((user) =>
      user.uid === from
        ? {
            ...user,
            messages: user.messages.push({ message, fromSelf: false }),
          }
        : user
    );
    var updateForNewMessage = updateForMessage.map((user) =>
      user.uid === from
        ? {
            ...user,
            hasNewMessages: true,
          }
        : user
    );
    setAllActiveUsers(updateForNewMessage);
  });

  return (
    <div className='flex flex-col'>
      <ActiveUserCount count={count} />
      {/* Sidebar div */}
      <Sidebar allActiveUsers={allActiveUsers} />
    </div>
  );
}
