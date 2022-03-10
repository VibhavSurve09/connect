import React from "react";
import Post from "./Post";
export default function Timeline({ posts }) {
  return (
    <div className="flex flex-col w-full lg:w-2/4">
      {posts.length > 0 ? (
        <>
          {posts.map((post, index) => {
            if (index > 15) {
              return;
            }
            return <Post post={post} key={index} />;
          })}
        </>
      ) : null}
    </div>
  );
}
