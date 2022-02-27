import produce from "immer";
import React, { useEffect, useState } from "react";
import { socketForChats } from "../../server";
import ChatPanel from "./ChatPanel";
import Image from "next/image";
export default function Sidebar({ allActiveUsers, setAllActiveUsers }) {
  const [showChats, setShowChats] = useState(false);
  const [showChatUser, setShowChatUser] = useState({});
  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState(allActiveUsers);
  const showChat = (user) => {
    setShowChats(true);
    setShowChatUser(user);
  };
  useEffect(() => {
    setSearchedUsers(allActiveUsers);
  }, [allActiveUsers]);
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
  useEffect(() => {
    // let searchUsers = produce(searchedUsers, (draft) => {
    //   draft.filter((user) => user.userData.userName.includes(search));
    // });
    //* Can be optimized further
    const arr = allActiveUsers.filter((user) =>
      user.userData.userName.includes(search)
    );
    setSearchedUsers(arr);
  }, [search]);
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
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-2 border-black px-2  rounded-2xl ml-2"
          ></input>
        </div>
        <hr className="mt-4"></hr>
        <ul className="relative">
          {searchedUsers.map((activeUser) => {
            return (
              <li
                key={activeUser.uid}
                onClick={() => showChat(activeUser)}
                className="relative mt-2 cursor-pointer bg-white px-3 py-3 rounded-md border-2 border-purple-600 flex flex-row"
              >
                <div className="relative">
                  {/* <Image
                    className="rounded-full"
                    src={activeUser.userData.photoURL}
                    height={50}
                    width={50}
                    alt={`${activeUser.userData.userName}`}
                  /> */}
                  <span
                    className={`absolute inline-block w-3 h-3 -ml-3 mt-10 ${
                      activeUser.connected && `bg-green-600`
                    } border-2 border-white rounded-full ${
                      !activeUser.connected && `bg-red-600`
                    }`}
                  ></span>
                </div>
                <div className="flex flex-col ml-5 font-sans">
                  <p className="font-semibold">
                    {activeUser.userData.userName}
                  </p>
                  <p>
                    <i>
                      {activeUser.hasNewMessages
                        ? "New messages!"
                        : "No new message!"}
                    </i>
                  </p>
                </div>
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
