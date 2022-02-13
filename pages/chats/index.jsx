import produce from 'immer';
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
  const { allActiveUsers, setAllActiveUsers } = useAllActiveUsers();
  let count = useShowCount();
  useEffect(() => {
    const sessionID = localStorage.getItem('fetchChat');

    if (data) {
      //AUID-Active user id
      socketForChats.auth = {
        userName: data.userName,
        auid: data.uid,
        photoURL: data.photoURL,
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
  socketForChats.on('connect', () => {
    const user = produce(allActiveUsers, (draft) => {
      draft.forEach((user) => {
        console.log(user);
        if (user.self) {
          user.connected = true;
        }
      });
    });
    setAllActiveUsers(user);
  });
  return (
    <div>
      <ActiveUserCount count={count} />
      {/* Sidebar div */}
      <Sidebar
        allActiveUsers={allActiveUsers}
        setAllActiveUsers={setAllActiveUsers}
      />
    </div>
  );
}
