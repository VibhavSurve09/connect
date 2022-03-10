import React from 'react';

export default function Timeline({ posts }) {
  return (
    <div>
      Timeline
      {posts.length > 0 ? (
        <>
          {posts.map((post, index) => {
            return (
              <div key={index}>
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
