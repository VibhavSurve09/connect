import produce from 'immer';
import React, { useEffect, useState } from 'react';
import { socketForChats } from '../../server';
export default function ChatPanel({ userChat, allUsers, setAllActiveUsers }) {
  const [message, setMessage] = useState('');
  console.log('Rendering chatp', allUsers);
  console.log('User chat', userChat);
  const sendMessage = (e) => {
    e.preventDefault();
    socketForChats.emit('private_message', {
      to: userChat.uid,
      message,
    });
    const newMess = produce(allUsers, (draft) => {
      draft.forEach((u) => {
        if (u.uid === userChat.uid) {
          u.messages.push({
            message,
            fromSelf: true,
          });
        }
      });
    });
    console.log('Types message is', newMess);
    setAllActiveUsers(newMess);
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
