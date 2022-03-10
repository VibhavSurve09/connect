import React from "react";
import Image from "next/image";
export default function Timeline({ posts }) {
  return (
    <div className="flex flex-col w-full lg:w-1/3">
      {posts.length > 0 ? (
        <>
          {posts.map((post, index) => {
            return (
              <div
                key={index}
                className="px-3 py-3 mt-2 mb-3 bg-white border-2 border-indigo-400 divide-y-2 divide-gray-500 rounded-lg bg-white-300"
              >
                <div className="w-full pb-3">
                  {/* <Image src={post.photoURL} height={30} width={30}></Image> */}
                  {console.log(post.photoURL, post)}
                  <p className="block font-bold text-black">{post.userName}</p>

                  <p className="block mt-2 text-xl leading-snug text-black dark:text-white">
                    {post.postContent}
                  </p>
                </div>
                <div className="py-1">
                  <button>
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
                </div>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
