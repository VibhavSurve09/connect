import React, { useEffect, useState, useContext } from "react";
import { addCommentToFB, editPostFB, getPosts } from "../../services/firebase";
import { UserContext } from "../../context/User";
import { likePost } from "../../services/neo4j";
import Image from "next/image";
import { increaseLikeCountInFB } from "../../services/firebase";
import { disLikePost } from "../../services/neo4j";
import { decreaseLikeCountInFB } from "../../services/firebase";
import { haveILikedThePost, getWhoLikedThePost } from "../../services/neo4j";
import { getUserByDocId } from "../../services/firebase";
import Link from "next/link";
import moment from "moment";
import UserComment from "./UserComment";
import Head from "next/head";
function InterActiveFocusedPost({ docId, userLikes, owner }) {
  const [postData, setPostData] = useState({});
  const activeUser = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [toggleComment, setToggleComment] = useState(false);
  const [userDataWhoPosted, setUserDataWhoPosted] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [editPostContent, setEditPostContent] = useState("");
  const [interActive, setInteractive] = useState(false);
  const [savedPressed, setSavePressed] = useState(false);
  const addComment = () => {
    const commentObject = {
      commentOwner: activeUser?.uid,
      commentData: comment,
    };
    addCommentToFB(commentObject, docId);
    comments.push(commentObject);
    setComment("");
  };
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
      setInteractive(data.isInteractive);
      setEditPostContent(data.postContent);
      setComments(data.comments);
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
    getWhoLikedThePost(docId).then((likes) => {
      setLikes(likes.length);
    });
  }, [docId]);
  const saveEditPost = () => {
    if (editPostContent.trim() != "") {
      editPostFB(docId, editPostContent, interActive);
      setEditPost(false);
      setSavePressed(true);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <Head>
        <title>Post - ConnectU</title>
      </Head>
      <div className="flex flex-col items-center justify-start w-full px-6 py-4 bg-white border-2 border-indigo-400 shadow-lg group lg:w-2/4 rounded-xl bg-white-300 h-fit">
        <div className="w-full divide-y-2 divide-gray-500">
          <div className="flex flex-col py-2">
            {" "}
            {/* Edit Post */}
            {owner ? (
              <div className="flex justify-end invisible group-hover:visible">
                <button
                  onClick={(e) => {
                    setEditPost(!editPost);
                    setSavePressed(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
            ) : null}
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
                {userDataWhoPosted?.userName}
              </p>
            </div>
            {!editPost ? (
              <>
                {" "}
                {savedPressed ? (
                  <>
                    {" "}
                    <p className="py-3 mt-2 overflow-auto text-lg max-h-96">
                      {editPostContent}
                    </p>
                  </>
                ) : (
                  <>
                    {" "}
                    <p className="py-3 mt-2 overflow-auto text-lg max-h-96">
                      {postData.postContent}
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                {" "}
                <input
                  className="px-2 py-1 mt-2 overflow-auto text-lg border-2 border-indigo-400 rounded-md max-h-96"
                  value={editPostContent}
                  onChange={(e) => setEditPostContent(e.target.value)}
                />
              </>
            )}
          </div>
          <div className="py-5">
            <p className="text-sm text-gray-500">
              {postData?.timeStamp?.seconds ? (
                <>
                  {postData?.edit ? (
                    <>
                      {" "}
                      Edited{" "}
                      {moment.unix(postData?.timeStamp?.seconds).format("LLL")}
                    </>
                  ) : (
                    <>
                      {" "}
                      {moment.unix(postData?.timeStamp?.seconds).format("LLL")}
                    </>
                  )}
                </>
              ) : null}
            </p>
            {!liked ? (
              <div className="flex">
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
              <div className="overflow-auto max-h-72">
                {comments.map((comment, index) => {
                  return (
                    <div key={index}>
                      <div className="flex flex-row items-center px-2 py-1 mt-2 border-b-2 border-indigo-400 rounded-md bg-gray-50">
                        <UserComment uid={comment.commentOwner} />
                        <span className="px-1">{comment.commentData}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <br></br>
            {toggleComment ? (
              <>
                <textarea
                  className="w-full px-2 py-1 border-2 border-indigo-400 rounded-md resize-none lg:w-4/5"
                  height={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment.."
                />
                <button
                  onClick={addComment}
                  className="flex items-center px-3 py-1 font-semibold bg-indigo-400 rounded-md hover:text-white hover:bg-indigo-600 hover:font-bold"
                >
                  Post
                </button>
              </>
            ) : null}
          </div>
        </div>

        {editPost ? (
          <div className="flex flex-col lg:flex-row">
            {postData.isInteractive ? (
              <>
                {" "}
                <label className="relative flex items-start justify-start p-1 group">
                  <span className="flex items-center ml-5 text-sm font-medium">
                    <i>Interactive</i>
                  </span>
                  <input
                    type="checkbox"
                    className="absolute w-full h-full -translate-x-1/2 rounded-md appearance-none left-1/2 peer"
                    onChange={(e) => setInteractive(!interActive)}
                  />
                  <span className="flex items-center flex-shrink-0 w-16 h-5 p-1 ml-4 duration-100 ease-in-out bg-indigo-400 rounded-full peer-checked:bg-gray-300 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-100 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
                  <span className="ml-3 text-sm font-medium">
                    <i>Normal</i>
                  </span>
                </label>
              </>
            ) : (
              <>
                {" "}
                <label className="relative flex items-start justify-start p-1 group">
                  <span className="flex items-center ml-5 text-sm font-medium">
                    <i>Normal</i>
                  </span>
                  <input
                    type="checkbox"
                    className="absolute w-full h-full -translate-x-1/2 rounded-md appearance-none left-1/2 peer"
                    onChange={(e) => setInteractive(!interActive)}
                  />
                  <span className="flex items-center flex-shrink-0 w-16 h-5 p-1 ml-4 duration-100 ease-in-out bg-gray-300 rounded-full peer-checked:bg-indigo-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-100 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
                  <span className="ml-3 text-sm font-medium">
                    <i>Interactive</i>
                  </span>
                </label>
              </>
            )}

            <div className="flex ml-10">
              <button
                onClick={saveEditPost}
                className="flex items-center px-3 py-1 font-bold text-white bg-indigo-500 rounded-md hover:text-black hover:bg-indigo-600 hover:font-semibold"
              >
                Save
              </button>{" "}
              <button
                onClick={(e) => setEditPost(false)}
                className="flex items-center px-3 py-1 ml-1 font-bold text-white bg-red-500 rounded-md hover:text-black hover:bg-red-600 hover:font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default InterActiveFocusedPost;
