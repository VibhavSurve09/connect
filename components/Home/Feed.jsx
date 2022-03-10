import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/User";
import { useUser } from "../../hooks/useUser";
import { useState } from "react";
import { getPosts, savePost } from "../../services/firebase";
import Image from "next/image";
import { serverTimestamp } from "@firebase/firestore";
import axios from "axios";
import Timeline from "./Timeline";
import styles from "./Feed.module.css";
export default function Feed() {
  const [divClick, setDivClick] = useState(false);
  const [input, setInput] = useState("");
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  const [timeline, setTimeLine] = useState([]);
  const [timelinePost, setTimelinePosts] = useState([]);
  const headers = {
    id: data?.uid,
    emailAddress: data?.emailAddress,
  };
  const savePostToFB = async () => {
    if (data && !loading) {
      const post = {
        userName: data.userName,
        userNameDocId: data.docId,
        photoURL: data.photoURL,
        postContent: input,
        interested: 0,
        notInterested: 0,
        timeStamp: serverTimestamp(),
        comments: [],
      };

      let postId = await savePost(post, data.docId);
      let nodeData = {
        userDocId: data.docId,
        userUID: data.uid,
        postDocId: postId,
      };
      await axios.post(
        `${process.env.API_URI}/api/posts/`,
        { userUID: data.uid, nodeData },
        {
          headers,
        }
      );
      setInput("");
    }
  };
  useEffect(() => {
    async function getData() {
      let tempData = await axios.get(
        `${process.env.API_URI}/api/posts/${data.uid}`,
        {
          headers,
        }
      );
      setTimeLine(tempData.data.posts);
    }
    if (data) {
      getData();
    }
  }, [data]);
  useEffect(() => {
    timeline.map((post) => {
      getPosts(post.postDocId).then((postData) => {
        setTimelinePosts((oldPosts) => [postData, ...oldPosts]);
      });
    });
  }, [timeline]);
  return (
    <div className="flex justify-center min-h-screen bg-gray-200 ">
      <div className="relative flex flex-row justify-center w-full top-7">
        {data && !loading ? (
          <div className="flex w-full lg:w-2/4 justify-">
            <div className="w-full bg-white border-t-4 border-indigo-400 rounded-md shadow-md h-fit">
              <div>
                {" "}
                <div className="flex flex-row py-2">
                  <div className="flex items-center px-6 py-2">
                    <Image
                      src={data.photoURL}
                      height={90}
                      width={90}
                      alt={`${data.userName} profile picture`}
                      className="rounded-full"
                    ></Image>
                  </div>
                  <div className="w-full px-3 py-2">
                    <textarea
                      onClick={(e) => setDivClick(true)}
                      placeholder={`What's new ${data.userName}?`}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full px-5 py-2 text-lg border-2 border-indigo-800 resize-none rounded-xl lg:text-2xl md:text-2xl"
                      rows={2}
                    ></textarea>
                  </div>
                </div>
                {divClick ? (
                  <div className="flex flex-row justify-end mb-3 mr-3">
                    <button
                      className="px-5 py-2 ml-2 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-400 w-fit"
                      onClick={savePostToFB}
                    >
                      Post
                    </button>
                    <button
                      className="px-3 py-2 ml-2 font-medium text-white bg-red-500 rounded-lg w-fit hover:bg-red-400"
                      onClick={(e) => setDivClick(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : null}
              </div>{" "}
            </div>
          </div>
        ) : (
          <span className="flex items-center justify-center">
            <svg
              role="status"
              className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </span>
        )}
        <div
          className={`absolute flex justify-center w-full mt-48 overflow-auto ${styles.maxdivh}`}
        >
          <Timeline posts={timelinePost} />
        </div>
      </div>
    </div>
  );
}
