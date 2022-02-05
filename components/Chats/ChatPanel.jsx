import React, { useEffect, useState } from 'react';
import { useAllActiveUsers } from '../../hooks/useAllActiveUsers';
import { socketForChats } from '../../server';
export default function ChatPanel({ userChat }) {
  console.log(userChat.uid, socketForChats.id === userChat.uid);
  const [message, setMessage] = useState('');
  const { users } = useAllActiveUsers();
  const sendMessage = (e) => {
    e.preventDefault();
    socketForChats.emit('private_message', {
      to: userChat.uid,
      message,
    });
    setMessage('');
  };
  useEffect(() => {
    socketForChats.on('private_message', ({ from, message }) => {
      console.log(message);
      for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user.uid === from) {
          user.message.push({ message, fromSelf: false });
        }
        if (user !== userChat.uid) {
          user.hasNewMessages = true;
        }
        break;
      }
    });
  });

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
