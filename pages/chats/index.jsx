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
  const { data, loading } = useUser(activeUser?.uid);
  const { allActiveUsers } = useAllActiveUsers();
  let count = useShowCount();
  if (!loading && data) {
    //AUID-Active user id
    socketForChats.auth = { userName: data.userName, auid: data.uid };
    //socketForChats.connect();
  }
  useEffect(() => {
    const sessionID = localStorage.getItem('fetchChat');
    if (sessionID) {
      socketForChats.auth = { sessionID };
      // socketForChats.connect();
    } else {
      if (!loading && data) {
        //AUID-Active user id
        socketForChats.auth = { userName: data.userName, auid: data.uid };
      }
      socketForChats.connect();
    }
  }, []);
  socketForChats.on('session', ({ sessionID, uid }) => {
    socketForChats.auth = { sessionID };
    localStorage.setItem('fetchChat', sessionID);
    socketForChats.uid = uid;
  });

  return (
    <div className='flex flex-col'>
      <ActiveUserCount count={count} />
      {/* Sidebar div */}
      <Sidebar allActiveUsers={allActiveUsers} />
    </div>
  );
}
