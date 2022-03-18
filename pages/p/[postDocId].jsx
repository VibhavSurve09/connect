import React, { useEffect, useState } from 'react';
import FocusedPost from '../../components/Post/FocusedPost';
import { getWhoLikedThePost } from '../../services/neo4j';

function PostPage({ id }) {
  const [userLikes, setUserLikes] = useState([]);
  useEffect(() => {
    getWhoLikedThePost(id).then((likes) => {
      setUserLikes(likes);
    });
  }, [id]);
  return (
    <div>
      <FocusedPost docId={id} />
      {/* TODO: Implemenet Users can select if they want to show Likes or Not*/}
      {userLikes.length > 0 ? (
        <>
          {userLikes.map((user, index) => {
            return (
              <div key={index}>
                <p>{user.userName}</p>
              </div>
            );
          })}
        </>
      ) : null}
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
