import produce from "immer";
import styles from "./ChatPanel.module.css";
import React, { useEffect, useState, useRef, useContext } from "react";
import { socketForChats } from "../../server";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useUser } from "../../hooks/useUser";
import { UserContext } from "../../context/User";
import { updateLastSeen } from "../../services/firebase";
import { serverTimestamp } from "@firebase/firestore";
import HeaderInformation from "./HeaderInformation";
import moment from "moment";
export default function ChatPanel({ userChat, allUsers, setAllActiveUsers }) {
  const [message, setMessage] = useState("");
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
      behaviour: "smooth",
      block: "start",
    });
  };
  const sendMessage = (e) => {
    e.preventDefault();
    updateLastSeen(data.docId, serverTimestamp());
    if (message != "") {
      socketForChats.emit("private_message", {
        to: userChat.uid,
        message,
        time: Date.now(),
      });
      const newMess = produce(allUsers, (draft) => {
        draft.forEach((u) => {
          if (u.uid === userChat.uid) {
            u.messages.push({
              message,
              fromSelf: true,
              time: Date.now(),
            });
          }
        });
      });
      setAllActiveUsers(newMess);
      setMessage("");
    }
  };
  return (
    <div
      className={`items-center py-4 mb-14 overflow-auto  max-h-screen rounded-md  ${styles.marginchat}`}
    >
      {/* Header */}

      <HeaderInformation
        name={userChat.userData.userName}
        status={userChat.connected}
        profilePicture={userChat.userData.photoURL}
      />
      {/* messages */}
      <ul>
        {chatUser ? (
          <>
            {" "}
            {chatUser.messages.map((message, index) => {
              return (
                <div key={index}>
                  <div>
                    {message.fromSelf ? (
                      <div
                        className={`max-w-md flex justify-end  ${styles.marginbubble}`}
                      >
                        {" "}
                        <div className="flex flex-col">
                          <p className="px-4 py-2 mt-2 ml-5 bg-white border-2 border-indigo-400 rounded-lg w-fit ">
                            <ReactReadMoreReadLess
                              charLimit={200}
                              readMoreText={`Read more ▼`}
                              readLessText={"Read less ▲"}
                            >
                              {message.message}
                            </ReactReadMoreReadLess>
                          </p>
                          <p className="text-xs ml-6">
                            {moment(message.time).format("LT")}
                          </p>
                        </div>
                        <div className="mb-5" ref={endOfMessagesRef}>
                          {" "}
                          {scrollToBottom()}
                        </div>
                      </div>
                    ) : (
                      <div className="text-left max-w-md flex flex-col">
                        {" "}
                        <p className="rounded-lg bg-indigo-100 py-2 px-4 w-fit mt-2 ml-3 border-2 border-purple-400">
                          <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={`Read more ▼`}
                            readLessText={"Read less ▲"}
                          >
                            {message.message}
                          </ReactReadMoreReadLess>
                        </p>
                        <p className=" text-xs ml-4">
                          {moment(message.time).format("LT")}
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
            {" "}
            {userChat.messages.map((message, index) => {
              return (
                <div key={index}>
                  <div>
                    {message.fromSelf ? (
                      <div className="flex justify-end">
                        {" "}
                        <div className="flex flex-col">
                          <p className="px-4 py-2 mt-2 ml-5 bg-white border-2 border-indigo-400 rounded-lg w-fit">
                            <ReactReadMoreReadLess
                              charLimit={200}
                              readMoreText={`<i>Read More</i>`}
                              readLessText={"Read less ▲"}
                            >
                              {message.message}
                            </ReactReadMoreReadLess>
                          </p>
                          <p className="text-xs ml-6">
                            {moment(message.time).format("LT")}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-left flex flex-col">
                        {" "}
                        <p className="max-w-xs px-4 py-2 mt-2 ml-3 bg-indigo-100 rounded-lg w-fit">
                          <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={`<i>Read More</i>`}
                            readLessText={"Read less ▲"}
                          >
                            {message.message}
                          </ReactReadMoreReadLess>
                        </p>
                        <p className="text-xs ml-4">
                          {moment(message.time).format("LT")}
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
        <div className="absolute flex flex-row w-4/5 -bottom-24 bg-indigo-200 border-t-2 border-purple-500">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-3/4 px-4 py-2 ml-10 bg-white border-2 border-black rounded-md mt-3 mb-3"
          />

          <button
            type="submit"
            className="px-6 ml-3 font-semibold bg-white rounded-md hover:text-lg h-fit border-2 border-purple-600 py-2 mt-3"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
