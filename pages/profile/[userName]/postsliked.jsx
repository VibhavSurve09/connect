import React from "react";
import PostsThatIHaveLiked from "../../../components/Profile/PostsThatIHaveLiked";

export default function LikedPosts({ userName }) {
  return (
    <div className="flex justify-center mt-2 bg-gray-100">
      <PostsThatIHaveLiked username={userName} />
    </div>
  );
}
export async function getServerSideProps(context) {
  const { userName } = context.params;
  return {
    props: {
      userName,
    }, // will be passed to the page component as props
  };
}
