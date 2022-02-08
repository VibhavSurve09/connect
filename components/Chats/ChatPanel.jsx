import React, { useEffect, useState } from 'react';
import { useAllActiveUsers } from '../../hooks/useAllActiveUsers';
import { socketForChats } from '../../server';
export default function ChatPanel({ userChat }) {
  const [message, setMessage] = useState('');
  const { allActiveUsers, setAllActiveUsers } = useAllActiveUsers();
  const sendMessage = (e) => {
    e.preventDefault();
    socketForChats.emit('private_message', {
      to: userChat.uid,
      message,
      from: socketForChats.uid,
    });
    var arr = allActiveUsers.map((user) =>
      user.uid === userChat.uid
        ? {
            ...user,
            messages: [...user.messages, { message, from, to }],
          }
        : user
    );
    setAllActiveUsers(allActiveUsers);
    setMessage('');
  };
  return (
    <div className='items-center ml-56 bg-red-500'>
      {/* Header */}
      In Chat pannel
      <div className=''></div>
      {/* messages */}
      <ul></ul>
      {/* InputForm */}
      <form onSubmit={sendMessage}>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='bg-purple-600'
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}
