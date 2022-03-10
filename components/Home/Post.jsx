import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
function Post({ post }) {
  const [liked, setLiked] = useState(false);
  // const [likes,setLikes]=
  // const addLike=()=>{

  // }
  // const removeLike
  return (
    <div className="px-3 py-3 mt-2 mb-3 bg-white border-2 border-indigo-400 divide-y-2 divide-gray-500 rounded-lg bg-white-300">
      <div className="w-full pb-3">
        {/* <Image src={post.photoURL} height={30} width={30}></Image> */}
        <p className="block font-bold text-black">{post.userName}</p>

        <p className="block mt-2 text-xl leading-snug text-black dark:text-white">
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
            <button onClick={(e) => setLiked(true)}>
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
            </button>
          </>
        ) : (
          <>
            {" "}
            <button onClick={(e) => setLiked(false)}>
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
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Post;
