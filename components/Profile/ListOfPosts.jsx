import React from "react";

function ListOfPosts({ posts }) {
  return (
    <div className="flex flex-row overflow-x-auto">
      {posts.map((post, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-center px-5 py-2 mt-2 ml-2 mr-3 text-black break-words bg-gray-200 border-2 border-gray-500 rounded-lg "
          >
            <p className="w-full">{post.postContent}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ListOfPosts;
