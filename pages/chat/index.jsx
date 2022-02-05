import React, { useContext } from 'react';
import socket from '../../server';
import { UserContext } from '../../context/User';
import { useUser } from '../../hooks/useUser';
export default function Chat() {
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  if (!loading && data) {
    //AUID-Active user id
    socket.auth = { userName: data.userName, auid: data.uid };
    socket.connect();
  }
  socket.on('users', (payload) => {
    console.log(payload, payload.length);
  });
  return <div></div>;
}
