import produce from 'immer';
import styles from './ChatPanel.module.css';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { socketForChats } from '../../server';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import { useUser } from '../../hooks/useUser';
import { UserContext } from '../../context/User';
import { updateLastSeen } from '../../services/firebase';
import { serverTimestamp } from '@firebase/firestore';
import HeaderInformation from './HeaderInformation';

export default function ChatPanel({ userChat, allUsers, setAllActiveUsers }) {
  const [message, setMessage] = useState('');
  let chatUser = null;
  const activeUser = useContext(UserContext);
  const { data } = useUser(activeUser?.uid);
  const endOfMessagesRef = useRef(null);
  allUsers.forEach((u) => {
    if (u.uid === userChat.uid) {
      chatUser = u;
    }
  });
  const scrollToBottom = () => {
    endOfMessagesRef?.current?.scrollIntoView({
      behaviour: 'smooth',
      block: 'start',
    });
  };
  const sendMessage = (e) => {
    e.preventDefault();
    updateLastSeen(data.docId, serverTimestamp());
    if (message != '') {
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
      setAllActiveUsers(newMess);
      setMessage('');
    }
  };
  return (
    <div
      className={`items-center py-4 bg-gray-200 mb-14 overflow-auto  max-h-screen rounded-md  ${styles.marginchat}`}
    >
      {/* Header */}
      In Chat pannel
      <HeaderInformation
        name={userChat.userData.userName}
        status={userChat.connected}
        profilePicture={userChat.userData.photoURL}
        lastSeen={userChat.userData.lastSeen}
      />
      {/* messages */}
      <ul>
        {chatUser ? (
          <>
            {' '}
            {chatUser.messages.map((message, index) => {
              return (
                <div key={index}>
                  <div>
                    {message.fromSelf ? (
                      <div
                        className={`max-w-md flex justify-end ${styles.marginbubble}`}
                      >
                        {' '}
                        <p className='px-4 py-2 mt-2 ml-5 bg-white border-2 border-indigo-400 rounded-lg w-fit '>
                          <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={`Read more ▼`}
                            readLessText={'Read less ▲'}
                          >
                            {message.message}
                          </ReactReadMoreReadLess>
                        </p>
                        <div className='mb-5' ref={endOfMessagesRef}>
                          {' '}
                          {scrollToBottom()}
                        </div>
                      </div>
                    ) : (
                      <div className='max-w-md text-left'>
                        {' '}
                        <p className='px-4 py-2 mt-2 ml-5 bg-indigo-200 border-2 border-indigo-400 rounded-lg w-fit'>
                          <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={`Read more ▼`}
                            readLessText={'Read less ▲'}
                          >
                            {message.message}
                          </ReactReadMoreReadLess>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {' '}
            {userChat.messages.map((message, index) => {
              return (
                <div key={index}>
                  <div>
                    {message.fromSelf ? (
                      <div>
                        {' '}
                        <p className='px-4 py-2 mt-2 ml-5 bg-white border-2 border-indigo-400 rounded-lg w-fit'>
                          <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={`<i>Read More</i>`}
                            readLessText={'Read less ▲'}
                          >
                            {message.message}
                          </ReactReadMoreReadLess>
                        </p>
                      </div>
                    ) : (
                      <div className='text-left'>
                        {' '}
                        <p className='max-w-xs px-4 py-2 mt-2 ml-5 bg-red-300 rounded-lg w-fit'>
                          <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={`<i>Read More</i>`}
                            readLessText={'Read less ▲'}
                          >
                            {message.message}
                          </ReactReadMoreReadLess>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </ul>
      {/* InputForm */}
      <form onSubmit={sendMessage}>
        <div className='absolute flex flex-row w-4/5 -bottom-24'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='w-3/4 px-4 py-2 ml-5 bg-white border-2 border-black rounded-md '
          />

          <button
            type='submit'
            className='px-6 ml-2 font-semibold bg-indigo-200 rounded-md hover:text-lg'
          >
            Send
          </button>
        </div>
      </form>
      <div className='my-4'></div>
    </div>
  );
}
