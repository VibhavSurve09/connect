import produce from 'immer';
import React, { useEffect, useState } from 'react';
import { useAllActiveUsers } from '../../hooks/useAllActiveUsers';
import { socketForChats } from '../../server';
export default function ChatPanel({ userChat, allUsers }) {
  const [message, setMessage] = useState('');
  const { allActiveUsers, setAllActiveUsers } = useAllActiveUsers();
  const [newMessages, setNewMessages] = useState(userChat.messages);
  const sendMessage = (e) => {
    e.preventDefault();
    socketForChats.emit('private_message', {
      to: userChat.uid,
      message,
    });
    console.log(allActiveUsers);
    const newM = produce(newMessages, (draft) => {
      draft.push({
        message,
        fromSelf: true,
        to: userChat.uid,
        from: socketForChats.uid,
      });
    });
    setNewMessages(newM);
    const newMess = produce(allUsers, (draft) => {
      draft.forEach((u) => {
        if (u.uid === userChat.uid) {
          u.messages.push({
            message,
            fromSelf: true,
            to: userChat.uid,
            from: socketForChats.uid,
          });
        }
      });
    });
    console.log(newMess);
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
        {newMessages.map((message, index) => {
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
