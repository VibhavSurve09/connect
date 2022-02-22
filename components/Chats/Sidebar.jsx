import produce from "immer";
import React, { useEffect, useState } from "react";
import { socketForChats } from "../../server";
import ChatPanel from "./ChatPanel";

export default function Sidebar({ allActiveUsers, setAllActiveUsers }) {
  const [showChats, setShowChats] = useState(false);
  const [showChatUser, setShowChatUser] = useState({});
  const showChat = (user) => {
    setShowChats(true);
    setShowChatUser(user);
  };

  useEffect(() => {
    socketForChats.on("private_message", ({ from, message, to, time }) => {
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
    <div className="flex flex-col h-screen">
      <div className="absolute h-full px-5 py-3 bg-indigo-50 shadow-2xl w-1/5 overflow-auto border-r-8 border-white">
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input className="w-full border-2 border-black px-2  rounded-2xl ml-2"></input>
        </div>
        <ul className="relative">
          {allActiveUsers.map((activeUser) => {
            return (
              <li
                key={activeUser.uid}
                onClick={() => showChat(activeUser)}
                className="relative mt-2 cursor-pointer bg-white px-3 py-3 rounded-md border-2 border-purple-600"
              >
                <p>{activeUser.userData.userName}</p>
                <p>{activeUser.connected ? "Online" : "Offline"}</p>
                <p>{activeUser.hasNewMessages ? "Yes" : "No"}</p>
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
