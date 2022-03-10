import React from "react";

function ListOfPosts({ posts }) {
  return (
    <div className="flex flex-col-reverse w-3/5 overflow-x-auto">
      {posts.map((post, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-center px-5 py-2 mt-2 text-black break-words bg-gray-100 border-2 border-indigo-400 rounded-lg "
          >
            <p className="w-full">{post.postContent}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ListOfPosts;
