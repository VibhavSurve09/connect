import React, { useState } from 'react';
import { useAllActiveUsers } from '../../hooks/useAllActiveUsers';
import { socketForChats } from '../../server';
import ChatPanel from './ChatPanel';

export default function Sidebar({ allActiveUsers }) {
  const [showChats, setShowChats] = useState(false);
  const [showChatUser, setShowChatUser] = useState({});
  const showChat = (user) => {
    setShowChats(true);
    setShowChatUser(user);
  };
  const { allActiveUsers: allUsers, setAllActiveUsers } = useAllActiveUsers();

  const updateHasNewMessage = (user) => {
    var updateHasMessage = allUsers.map((u) =>
      user.uid === u.uid
        ? {
            ...u,
            hasNewMessages: false,
          }
        : u
    );
    //TODO: New Message Not Working
    setAllActiveUsers(updateHasMessage);
  };
  socketForChats.on('private_message', ({ from, message }) => {
    console.log(message);
    var updateForMessage = allUsers.map((user) =>
      user.uid === from
        ? {
            ...user,
            messages: user.messages.push({ message, fromSelf: false }),
          }
        : user
    );
    var updateForNewMessage = updateForMessage.map((user) =>
      user.uid === from
        ? {
            ...user,
            hasNewMessages: true,
          }
        : user
    );
    setAllActiveUsers(updateForNewMessage);
  });
  return (
    <div>
      <div className='absolute h-full px-1 bg-white shadow-md w-60'>
        <ul className='relative'>
          {allActiveUsers.map((activeUser) => {
            return (
              <li
                key={activeUser.uid}
                onClick={() => {
                  showChat(activeUser);
                  updateHasNewMessage(activeUser);
                }}
                className='relative mt-2 cursor-pointer'
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
          <ChatPanel userChat={showChatUser} />
        </>
      ) : null}
    </div>
  );
}
