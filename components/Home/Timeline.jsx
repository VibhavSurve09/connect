import React from "react";

export default function Timeline({ posts }) {
  return (
    <div>
      {posts.length > 0 ? (
        <>
          {posts.map((post, index) => {
            return (
              <div key={index} className="bg-red-300 rounded-md">
                <p>{post.userName}</p>
                <p>{post.postContent}</p>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
