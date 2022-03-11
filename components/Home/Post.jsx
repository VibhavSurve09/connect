import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { UserContext } from "../../context/User";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { disLikePost, haveILikedThePost, likePost } from "../../services/neo4j";
import {
  decreaseLikeCountInFB,
  increaseLikeCountInFB,
} from "../../services/firebase";
function Post({ postInfo }) {
  const activeUser = useContext(UserContext);
  const { post, docId } = postInfo;
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
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
    haveILikedThePost(docId, activeUser?.uid).then((liked) => {
      if (liked.length > 0) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    });
  }, [activeUser, docId]);
  useEffect(() => {
    setLikes(post.interested);
  }, [post.interested]);
  const redirectToPost = () => {
    router.push(`/p/${docId}`);
  };
  return (
    <div className="px-5 py-3 mt-2 mb-3 bg-white border-2 border-indigo-400 divide-y-2 divide-gray-500 rounded-lg hover:px-8 bg-white-300">
      <div className="w-full pb-3">
        {!post.photoURL ? (
          <p className="block font-bold text-black">{post.userName}</p>
        ) : (
          <div className="flex flex-row items-center">
            <div className="flex items-center">
              <Image
                src={post.photoURL}
                height={36}
                width={36}
                alt="display picture"
                className="rounded-full"
              ></Image>
            </div>
            <p className="block px-3 text-lg font-bold text-black">
              <Link href={`/profile/${post.userName}`}>{post.userName}</Link>
            </p>
          </div>
        )}

        <p
          className="block mt-2 overflow-auto text-xl leading-snug text-black max-h-64 hover:cursor-pointer"
          onClick={redirectToPost}
        >
          {post.postContent}
        </p>
      </div>
      <div className="py-1">
        <p className="text-sm text-gray-500">
          {moment.unix(post.timeStamp.seconds).format("LLL")}
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
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(Post);
