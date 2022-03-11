import React from "react";
import AllPostsOfUser from "../../../components/Profile/UserPosts";

function UserPosts({ userName }) {
  return (
    <div className="flex justify-center mt-2 bg-gray-100">
      <AllPostsOfUser username={userName} />
    </div>
  );
}

export default UserPosts;
export async function getServerSideProps(context) {
  const { userName } = context.params;
  return {
    props: {
      userName,
    }, // will be passed to the page component as props
  };
}
