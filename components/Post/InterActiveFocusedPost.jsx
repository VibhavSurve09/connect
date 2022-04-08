import React, { useEffect, useState, useContext } from "react";
import { getPosts } from "../../services/firebase";
import { UserContext } from "../../context/User";
import { likePost } from "../../services/neo4j";
import Image from "next/image";
import { increaseLikeCountInFB } from "../../services/firebase";
import { disLikePost } from "../../services/neo4j";
import { decreaseLikeCountInFB } from "../../services/firebase";
import { haveILikedThePost } from "../../services/neo4j";
import { getUserByDocId } from "../../services/firebase";
import Link from "next/link";
import moment from "moment";
function InterActiveFocusedPost({ docId, userLikes, owner }) {
  const [postData, setPostData] = useState({});
  const activeUser = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [toggleComment, setToggleComment] = useState(false);
  const [userDataWhoPosted, setUserDataWhoPosted] = useState([]);
  const addLike = async () => {
    setLikes(likes + 1);
    setLiked(true);
    await likePost(activeUser?.uid, docId);
    await increaseLikeCountInFB(docId);
  };
  const removeLike = async () => {
    setLikes(likes - 1);
    setLiked(false);
    await disLikePost(activeUser?.uid, docId);
    await decreaseLikeCountInFB(docId);
  };
  useEffect(() => {
    getPosts(docId).then((data) => {
      setPostData(data);
    });
  }, [docId]);
  useEffect(() => {
    if (postData.userName) {
      getUserByDocId(postData?.userNameDocId).then((user) => {
        setUserDataWhoPosted(user);
      });
    }
  }, [postData]);
  useEffect(() => {
    haveILikedThePost(docId, activeUser?.uid).then((liked) => {
      if (liked.length > 0) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    });
  }, [activeUser, docId]);
  useEffect(() => {
    setLikes(postData.interested);
  }, [postData.interested]);
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-start w-full px-6 py-4 bg-white border-2 border-indigo-400 shadow-lg lg:w-2/4 rounded-xl bg-white-300 h-fit">
        <div className="w-full divide-y-2 divide-gray-500">
          <div className="flex flex-col py-5">
            {" "}
            <div className="flex flex-row items-center">
              {userDataWhoPosted.photoURL ? (
                <Image
                  src={userDataWhoPosted?.photoURL}
                  height={40}
                  width={40}
                  className="rounded-full"
                />
              ) : null}
              <p className="pl-3 text-2xl font-medium">
                {/* <Link href={`/profile/${userDataWhoPosted?.userName}`}> */}
                {userDataWhoPosted?.userName}
                {/* </Link> */}
              </p>
            </div>
            <p className="py-3 mt-2 overflow-auto text-lg max-h-96">
              {postData.postContent}
            </p>
          </div>
          <div className="py-5">
            <p className="text-sm text-gray-500">
              {moment.unix(postData?.timeStamp?.seconds).format("LLL")}
            </p>
            {!liked ? (
              <>
                {" "}
                <button onClick={addLike}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mt-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {likes}
                </button>
              </>
            ) : (
              <div className="flex flex-row">
                {" "}
                <button onClick={removeLike}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-2 text-red-600 w-7 h-7 "
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {likes}
                </button>
                <div>
                  <button onClick={(e) => setToggleComment(!toggleComment)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mt-2 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            {userLikes.length > 0 ? (
              <div className="flex flex-row overflow-auto">
                liked by
                {userLikes.map((user, index) => {
                  return (
                    <div key={index}>
                      {index < 3 ? (
                        <>
                          {" "}
                          <p className="px-1 font-medium">
                            <i>{user.userName}</i>,
                          </p>
                        </>
                      ) : null}
                    </div>
                  );
                })}
                {userLikes.length > 3 ? <>others.</> : null}
              </div>
            ) : null}

            {postData?.comments?.length > 0 ? (
              <>
                {postData?.comments.map((comment, index) => {
                  return <p key={index}>{comment}</p>;
                })}
              </>
            ) : null}
            <br></br>
            {toggleComment ? (
              <textarea
                className="w-full px-2 py-1 border-2 border-indigo-400 rounded-md resize-none lg:w-4/5"
                height={2}
                placeholder="Add a comment.."
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterActiveFocusedPost;
