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
    });
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
