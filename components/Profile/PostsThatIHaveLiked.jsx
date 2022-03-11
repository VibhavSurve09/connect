import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User";
import { useUser } from "../../hooks/useUser";
import { getPosts } from "../../services/firebase";
import { postsThatIhaveLiked } from "../../services/neo4j";
import Post from "../Home/Post";
export default function PostsThatIHaveLiked({ username }) {
  const [refs, setRefs] = useState([]);
  const [posts, setPosts] = useState([]);
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  useEffect(() => {
    postsThatIhaveLiked(username).then((nodes) => {
      setRefs(nodes);
    });
  }, [username]);
  useEffect(() => {
    refs.map((postMetaData) => {
      getPosts(postMetaData.postDocId).then((data) => {
        setPosts((oldArr) => [
          { ...data, docId: postMetaData.postDocId },
          ...oldArr,
        ]);
      });
    });
  }, [refs]);
  return (
    <div className="w-full h-screen py-5 overflow-auto bg-gray-100 lg:w-2/4 md:w-3/4">
      {posts.length > 0 &&
        posts.map((post, index) => {
          let postInfo = { post, docId: post.docId };
          return (
            <div key={index} className="w-full mt-4">
              <div>
                <Post postInfo={postInfo} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
