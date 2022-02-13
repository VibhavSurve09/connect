import produce from "immer";
import styles from "./ChatPanel.module.css";
import React, { useEffect, useState, useRef } from "react";
import { socketForChats } from "../../server";
import ReactReadMoreReadLess from "react-read-more-read-less";

export default function ChatPanel({ userChat, allUsers, setAllActiveUsers }) {
  const [message, setMessage] = useState("");
  let chatUser = null;
  const endOfMessagesRef = useRef(null);
  const readMore = `<i>Hey still more to read</i>`;
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
    if (message != "") {
      socketForChats.emit("private_message", {
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
      setMessage("");
    }
  };
  return (
    <div
      className={`items-center py-4 bg-gray-200 mb-14 overflow-auto  max-h-screen rounded-md  ${styles.marginchat}`}
    >
      {/* Header */}
      In Chat pannel
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
                        className={`max-w-md flex justify-end ${styles.marginbubble}`}
                      >
                        {" "}
                        <p className="rounded-lg bg-white py-2 px-4 w-fit mt-2 ml-5 border-2 border-indigo-400 ">
                          <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={`Read more ▼`}
                            readLessText={"Read less ▲"}
                          >
                            {message.message}
                          </ReactReadMoreReadLess>
                        </p>
                        <div className="mb-5" ref={endOfMessagesRef}>
                          {" "}
                          {scrollToBottom()}
                        </div>
                      </div>
                    ) : (
                      <div className="text-left max-w-md">
                        {" "}
                        <p className="rounded-lg bg-indigo-200 py-2 px-4 w-fit mt-2 ml-5 border-2 border-indigo-400">
                          <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={`Read more ▼`}
                            readLessText={"Read less ▲"}
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
            {" "}
            {userChat.messages.map((message, index) => {
              return (
                <div key={index}>
                  <div>
                    {message.fromSelf ? (
                      <div>
                        {" "}
                        <p className="rounded-lg bg-white py-2 px-4 w-fit mt-2 ml-5 border-2 border-indigo-400">
                          <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={`<i>Read More</i>`}
                            readLessText={"Read less ▲"}
                          >
                            {message.message}
                          </ReactReadMoreReadLess>
                        </p>
                      </div>
                    ) : (
                      <div className="text-left">
                        {" "}
                        <p className="rounded-lg bg-red-300 py-2 px-4 w-fit mt-2 ml-5 max-w-xs">
                          <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={`<i>Read More</i>`}
                            readLessText={"Read less ▲"}
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
        <div className="absolute -bottom-24 flex flex-row w-4/5">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white border-2 border-black px-4 py-2 rounded-md w-3/4 ml-5 "
          />

          <button
            type="submit"
            className="px-6 font-semibold rounded-md bg-indigo-200 ml-2 hover:text-lg"
          >
            Send
          </button>
        </div>
      </form>
      <div className="my-4"></div>
    </div>
  );
}
