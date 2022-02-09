import React, { useEffect, useState } from 'react';
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
  const { allActiveUsers: allUsers, setAllActiveUsers: setAllUsers } =
    useAllActiveUsers();
  const mainOnClickFunc = (user) => {
    showChat(user);
    //updateHasNewMessage(user);
  };
  useEffect(() => {
    // socketForChats.on('private_message', ({ from, message, to }) => {
    //   console.log(message);
    //   var updatedArr = allUsers.map((user) =>
    //     user.uid === from
    //       ? {
    //           ...user,
    //           hasNewMessages: true,
    //           messages: user.messages.push({ from, message }),
    //         }
    //       : user
    //   );
    // });
    socketForChats.on('private message', ({ message, from, to }) => {
      for (let i = 0; i < allUsers.length; i++) {
        const user = allUsers[i];
        const fromSelf = socketForChats.uid === from;
        if (user.uid === (fromSelf ? to : from)) {
          user.messages.push({
            message,
            fromSelf,
          });
          if (user !== showChatUser) {
            user.hasNewMessages = true;
          }
          console.log(user);
          setAllUsers([...allUsers, user]);
          break;
        }
      }
    });
  }, []);
  // const updateHasNewMessage = (user) => {
  //   var updateHasMessage = allUsers.map((u) =>
  //     user.uid === u.uid
  //       ? {
  //           ...u,
  //           hasNewMessages: false,
  //         }
  //       : u
  //   );
  //   //TODO: New Message Not Working
  //   console.log(updateHasMessage);
  //   setAllActiveUsers(updateHasMessage);
  // };
  return (
    <div>
      <div className='absolute h-full px-1 bg-white shadow-md w-60'>
        <ul className='relative'>
          {allActiveUsers.map((activeUser) => {
            return (
              <li
                key={activeUser.uid}
                onClick={() => {
                  mainOnClickFunc(activeUser);
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
