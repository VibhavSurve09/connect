import React, { useEffect, useState } from 'react';
import { useAllActiveUsers } from '../../hooks/useAllActiveUsers';
import { socketForChats } from '../../server';
export default function ChatPanel({ userChat, allUsers }) {
  const [message, setMessage] = useState('');
  const { setAllActiveUsers } = useAllActiveUsers();
  const sendMessage = (e) => {
    e.preventDefault();
    socketForChats.emit('private_message', {
      to: userChat.uid,
      message,
    });

    var arr = allUsers.map((user) =>
      user.uid === userChat.uid
        ? {
            ...user,
            messages: user.messages.push({
              to: userChat.uid,
              message,
              from: socketForChats.uid,
              fromSelf: true,
            }),
          }
        : user
    );
    setAllActiveUsers(arr);
    setMessage('');
  };
  return (
    <div className='items-center bg-red-500 ml-72'>
      {/* Header */}
      In Chat pannel
      <div className=''></div>
      {/* messages */}
      <ul>
        {userChat.messages.map((message, index) => {
          return (
            <li key={index}>
              <div>{message.fromSelf ? 'You' : null}</div>
              {message.message}
            </li>
          );
        })}
      </ul>
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
