import produce from 'immer';
import React, { useEffect, useState } from 'react';
import { socketForChats } from '../../server';
import ChatPanel from './ChatPanel';

export default function Sidebar({ allActiveUsers, setAllActiveUsers }) {
  const [showChats, setShowChats] = useState(false);
  const [showChatUser, setShowChatUser] = useState({});
  const showChat = (user) => {
    setShowChats(true);
    setShowChatUser(user);
  };

  useEffect(() => {
    socketForChats.on('private_message', ({ from, message, to, time }) => {
      const newMessage = produce(allActiveUsers, (draft) => {
        draft.forEach((u) => {
          const fromSelf = socketForChats.uid === from;
          if (u.uid === (fromSelf ? to : from)) {
            u.messages.push({
              message,
              fromSelf,
              time,
            });
            if (u.uid !== showChatUser.uid) {
              u.hasNewMessages = true;
            }
          }
        });
      });
      setAllActiveUsers(newMessage);
    });
  }, [allActiveUsers]);
  return (
    <div className='flex flex-col h-screen'>
      <div className='absolute w-1/5 h-full px-5 py-3 overflow-auto bg-purple-200 shadow-md rounded-xl'>
        <ul className='relative'>
          {allActiveUsers.map((activeUser) => {
            return (
              <li
                key={activeUser.uid}
                onClick={() => showChat(activeUser)}
                className='relative px-3 py-3 mt-2 bg-white rounded-md cursor-pointer'
              >
                <p>{activeUser.userData.userName}</p>
                <p>{activeUser.connected ? 'Online' : 'Offline'}</p>
                <p>{activeUser.hasNewMessages ? 'Yes' : 'No'}</p>
              </li>
            );
          })}
        </ul>
      </div>
      {showChats ? (
        <>
          <ChatPanel
            userChat={showChatUser}
            allUsers={allActiveUsers}
            setAllActiveUsers={setAllActiveUsers}
          />
        </>
      ) : null}
    </div>
  );
}
