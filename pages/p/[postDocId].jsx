import React, { useEffect, useState, useContext } from 'react';
import FocusedPost from '../../components/Post/FocusedPost';
import InterActiveFocusedPost from '../../components/Post/InterActiveFocusedPost';
import { UserContext } from '../../context/User';
import { getPosts } from '../../services/firebase';
import { getWhoLikedThePost } from '../../services/neo4j';

function PostPage({ id }) {
  const [userLikes, setUserLikes] = useState([]);
  const activeUser = useContext(UserContext);
  const [postOwner, setPostOwner] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    getWhoLikedThePost(id).then((likes) => {
      setUserLikes(likes);
    });
    getPosts(id).then((data) => {
      setPostOwner(data.owner === activeUser?.uid);
      setPost(data);
    });
  }, [id, activeUser?.uid]);

  return (
    <div>
      {postOwner || post?.isInteractive ? (
        <InterActiveFocusedPost
          docId={id}
          userLikes={userLikes}
          owner={postOwner}
        />
      ) : (
        <>
          {' '}
          <FocusedPost docId={id} />
        </>
      )}

      {/* TODO: Implemenet Users can select if they want to show Likes or Not*/}
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
