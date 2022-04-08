import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/User";
import Projects from "./Projects";
import {
  handleFollowUser,
  isUserInMyFollowingList,
} from "../../services/firebase";
import { useUser } from "../../hooks/useUser";
import axios from "axios";
import Link from "next/link";
import { removeFriend } from "../../services/firebase";
import { removeFriendNeo4j } from "../../services/neo4j";
import ProfileYouMayKnow from "./ProfileYouMayKnow";
import { getLatestPost } from "../../services/neo4j";
import { getPosts } from "../../services/firebase";
import moment from "moment";
export default function DisplayOtherProfile({
  userName,
  bio,
  gender,
  email,
  status,
  followers,
  skills,
  self,
  imgUrl,
  college,
  date,
  docId,
  uid,
  projects,
  following,
}) {
  const activeUser = useContext(UserContext);
  const router = useRouter();
  const { data, loading } = useUser(activeUser?.uid);
  const [isFriend, setIsFriend] = useState(false);
  const [fetchLatestPostLoading, setFetchLatesPostLoading] = useState(false);
  const [latestPost, setLatestPost] = useState({});
  const [unfollowModal, setUnfollowModal] = useState(false);
  useEffect(() => {
    if (data?.docId) {
      isUserInMyFollowingList(data?.docId, uid).then((res) => {
        if (res) {
          setIsFriend(true);
        } else {
          setIsFriend(false);
        }
      });
    }
  }, [uid, data?.docId, following, followers]);

  const addFriend = async () => {
    setIsFriend(true);
    if (!loading) {
      const headers = {
        id: activeUser.uid,
        emailAddress: activeUser.email,
      };
      await handleFollowUser(data?.docId, docId);
      await axios.post(
        `${process.env.API_URI}/api/users/sendFriendReq`,
        { senderDocId: data.docId, receiverDocId: docId },
        {
          headers,
        }
      );
      const notificationData = {
        senderDocId: data.docId,
        receiverDocId: docId,
        senderUserName: data.userName,
        senderPhotoURL: data.photoURL,
      };
      await axios.post(
        `${process.env.API_URI}/api/notifications/following`,
        notificationData,
        { headers }
      );
      router.push(`/profile/${userName}`);
    }
  };
  const removeUserFromFollowing = async (e) => {
    setIsFriend(false);
    e.preventDefault();
    setUnfollowModal(false);
    await removeFriend(data.docId, uid);
    await removeFriendNeo4j(data.docId, uid);
    router.push(`/profile/${userName}`);
  };
  useEffect(() => {
    setFetchLatesPostLoading(true);
    getLatestPost(userName).then((node) => {
      getPosts(node[0]?.postDocId).then((postData) => {
        setLatestPost(postData);
      });
    });
    setFetchLatesPostLoading(false);
  }, [userName]);

  return (
    <div className="flex flex-col h-auto bg-gray-100 lg:flex-row">
      <Head>
        <title>{`${userName} - Connect`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full text-white lg:max-w-7xl bg-main-color ">
        <div className="flex flex-row max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="container p-5 mx-auto my-5">
            <div className="flex flex-col">
              <div className="w-full shadow-lg">
                <div className="flex flex-col p-5 bg-white border-t-4 border-indigo-400 rounded-lg lg:flex-row sm:flex-row">
                  <div className="flex items-center justify-center md:max-w-fit sm:w-7/12 lg:max-w-fit md:mx-2">
                    <Image
                      className="flex flex-col p-5 bg-white border-t-4 border-indigo-400 rounded-full lg:flex-row sm:flex-row"
                      src={imgUrl}
                      alt={`${userName} display picture`}
                      height={200}
                      width={200}
                    />
                  </div>
                  <div className="w-full px-4 py-5">
                    {" "}
                    <span className="my-1 text-2xl font-semibold leading-8 text-gray-900 lg:text-5xl md:text-3xl">
                      {userName}
                    </span>
                    <h3 className="mt-1 leading-6 text-gray-600 font-lg text-semibold lg:text-2xl">
                      STUDENT AT {college}
                    </h3>{" "}
                    <span className="sm:w-full md:w-full">
                      {" "}
                      {isFriend ? (
                        <div className="flex flex-col lg:flex-row">
                          <button
                            className="px-4 py-3 mt-2 font-medium bg-indigo-600 rounded-2xl lg:max-w-fit hover:bg-indigo-500"
                            onClick={(e) => setUnfollowModal(true)}
                          >
                            Following
                          </button>
                          {unfollowModal ? (
                            <>
                              {" "}
                              <div className="flex flex-col w-full px-2 py-1 mt-3 font-semibold text-black bg-gray-100 lg:py-2 lg:mt-1 lg:flex-row sm:mt-2 md:mt-2 lg:ml-3 rounded-xl">
                                <div className="py-1">
                                  {" "}
                                  Do you want to unfollow <i>{userName}</i>?
                                </div>
                                <div className="flex flex-row justify-center">
                                  <button
                                    className="px-5 ml-2 font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 w-fit"
                                    onClick={removeUserFromFollowing}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className="px-3 ml-2 font-medium text-white bg-red-500 rounded-lg hover:bg-red-400 w-fit"
                                    onClick={(e) => setUnfollowModal(false)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      ) : (
                        <button
                          className="px-4 py-3 mt-2 font-medium bg-red-500 rounded-2xl lg:max-w-fit hover:bg-red-400"
                          onClick={addFriend}
                        >
                          Connect
                        </button>
                      )}
                    </span>
                    <ul className="px-3 py-2 mt-3 text-gray-600 bg-gray-100 divide-y rounded shadow-sm hover:text-gray-700 hover:shadow">
                      <li className="flex items-center py-3">
                        <span>Member since</span>
                        <span className="ml-auto">{date}</span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>Followers: {followers}</span>
                        <span className="ml-auto">Following: {following}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6"></div>
            <div className="relative flex flex-col p-5 mx-auto bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg">
              <div className="flex flex-row">
                <div className="text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 lg:mt-2 md:mt-1 sm:mt-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="px-2 text-lg font-semibold text-black md:text-2xl lg:text-3xl">
                  About{" "}
                </div>
              </div>
              <div className="w-full px-2">
                {" "}
                <p className="py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600">
                  {bio}
                </p>
              </div>
            </div>
            <div className="my-6"></div>
            <div className="relative flex flex-col p-5 mx-auto bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg">
              <div className="flex flex-row">
                <div className="text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 lg:mt-2 md:mt-1 sm:mt-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="px-2 text-lg font-semibold text-black md:text-2xl lg:text-3xl">
                  Posts
                </div>
              </div>
              {Object.keys(latestPost).length != 0 &&
              !fetchLatestPostLoading ? (
                <div className="flex flex-col items-center w-full px-2 py-4 lg:flex-row md:flex-row">
                  <div className="flex flex-col items-center justify-start w-full px-6 py-1 bg-gray-100 border-2 border-indigo-400 shadow-lg lg:w-2/4 rounded-xl bg-white-300 h-fit">
                    <div className="w-full divide-y-2 divide-gray-500">
                      <div className="flex flex-col py-5">
                        {" "}
                        <div className="flex flex-row items-center">
                          {latestPost.photoURL ? (
                            <Image
                              src={latestPost?.photoURL}
                              height={40}
                              width={40}
                              className="rounded-full"
                            />
                          ) : null}
                          <p className="pl-3 text-2xl font-medium text-black">
                            {/* <Link href={`/profile/${userDataWhoPosted?.userName}`}> */}
                            {latestPost?.userName}
                            {/* </Link> */}
                          </p>
                        </div>
                        <p className="py-3 mt-2 overflow-auto text-lg text-black max-h-96">
                          {latestPost.postContent}
                        </p>
                      </div>
                      <div className="py-5">
                        <p className="text-sm text-gray-500">
                          {moment
                            .unix(latestPost?.timeStamp?.seconds)
                            .format("LLL")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="px-2 ml-3 font-serif text-lg font-medium text-black sm:mt-2 sm:py-2 hover:text-blue-600 hover:underline hover:cursor-pointer">
                      <Link href={`/profile/${userName}/posts`}>
                        Check Out More Posts!
                      </Link>
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="py-2 font-serif text-xl text-gray-700">
                    No posts yet!
                  </p>
                </div>
              )}
            </div>
            <div className="my-6"></div>

            <div className="relative flex flex-col p-5 mx-auto bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg ">
              <div className="flex flex-row">
                <div className="text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 lg:mt-2 md:mt-1 sm:mt-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div className="px-2 text-lg font-semibold text-black md:text-2xl lg:text-3xl">
                  Skills{" "}
                </div>
              </div>
              <div className="w-full px-2">
                <div className="py-3 ">
                  <div className="w-full px-2">
                    <div className="py-3 overflow-auto text-lg text-gray-500 lg:text-xl hover:text-gray-600 max-h-72">
                      {skills.map((skill) => {
                        return (
                          <div
                            key={skill.id}
                            className="w-full px-4 py-2 mt-2 font-medium bg-gray-100 shadow-sm rounded-xl"
                          >
                            <p className="text-black">{skill.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6"></div>
            <div className="relative flex flex-col p-5 mx-auto bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg">
              <div className="flex flex-row">
                <div className="text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 lg:mt-2 md:mt-1 sm:mt-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <div className="px-2 text-lg font-semibold text-black md:text-2xl lg:text-3xl">
                  Projects{" "}
                </div>
              </div>
              <div className="w-full px-2">
                {" "}
                <div className="py-3 mt-2 mb-4 overflow-auto text-lg text-gray-500 lg:text-xl hover:text-gray-600 max-h-80">
                  {projects.length > 0 &&
                    projects.map((id, index) => {
                      return <Projects key={index} docId={id} />;
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 h-auto max-h-screen p-5 mx-auto -mt-4 overflow-auto bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg lg:mt-10 lg:mr-10 lg:min-h-40 lg:w-1/4 lg:h-2/4">
        <div className="flex flex-row">
          <div className="px-2 text-lg font-semibold text-black md:text-2xl lg:text-3xl">
            People you may know{" "}
          </div>
        </div>
        <ProfileYouMayKnow uid={uid} isFriend={isFriend} />
      </div>
      <div className="my-4 lg:my-0"></div>
    </div>
  );
}
