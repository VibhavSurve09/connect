import React from 'react';
import PostsThatIHaveLiked from '../../../components/Profile/PostsThatIHaveLiked';

export default function LikedPosts({ userName }) {
  return (
    <div>
      LikedPosts
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
