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
    socketForChats.on("private_message", ({ from, message, to }) => {
      const newMessage = produce(allActiveUsers, (draft) => {
        draft.forEach((u) => {
          const fromSelf = socketForChats.uid === from;
          if (u.uid === (fromSelf ? to : from)) {
            u.messages.push({
              message,
              fromSelf,
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
      <div className="absolute h-full px-5 py-3 bg-slate-300 shadow-xl w-1/5 overflow-auto border-r-8 border-gray-100">
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
