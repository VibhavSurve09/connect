import React from "react";
import FocusedPost from "../../components/Post/FocusedPost";
function PostPage({ id }) {
  return (
    <div>
      <FocusedPost docId={id} />
    </div>
  );
}

export default PostPage;

export async function getServerSideProps(context) {
  const { postDocId } = context.params;
  return {
    props: {
      id: postDocId,
    }, // will be passed to the page component as props
  };
}
