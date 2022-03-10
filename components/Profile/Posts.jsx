import React, { useContext } from 'react';
import { UserContext } from '../../context/User';
import { useUser } from '../../hooks/useUser';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPosts } from '../../services/firebase';
import ListOfPosts from './ListOfPosts';
function Posts() {
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  const [posts, setAllPosts] = useState([]);
  useEffect(() => {
    if (data && !loading) {
      let { postsRef } = data;
      if (postsRef) {
        postsRef.map((ref) => {
          getPosts(ref).then((postData) => {
            setAllPosts((oldPosts) => [...oldPosts, postData]);
          });
        });
      }
    }
  }, [data, activeUser]);
  return (
    <div>
      {posts.length > 0 ? (
<<<<<<< HEAD
        <div className="flex justify-center w-full">
=======
        <div className='w-full'>
>>>>>>> c4e44b9c202664f45bc8065db44f2719f85d6794
          <ListOfPosts posts={posts} />
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default Posts;
