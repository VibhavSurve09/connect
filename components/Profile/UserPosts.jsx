import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User';
import { useUser } from '../../hooks/useUser';
import { getPosts } from '../../services/firebase';
import { postsOfMe } from '../../services/neo4j';
import ListOfPosts from './ListOfPosts';

export default function AllPostsOfUser({ username }) {
  const [refs, setRefs] = useState([]);
  const [posts, setPosts] = useState([]);
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  useEffect(() => {
    postsOfMe(username).then((nodes) => {
      setRefs(nodes);
    });
  }, [username]);

  useEffect(() => {
    refs.map((postMetaData) => {
      getPosts(postMetaData.postDocId).then((data) => {
        setPosts((oldArr) => [data, ...oldArr]);
      });
    });
  }, [refs]);
  return (
    <div>
      AllPostsOfUser
      {posts.length > 0 &&
        posts.map((post, index) => {
          return <p key={index}>{post.postContent}</p>;
        })}
    </div>
  );
}
