import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/User";
import {
  handleFollowUser,
  isUserInMyFollowingList,
} from "../../services/firebase";
import { useUser } from "../../hooks/useUser";
import axios from "axios";
import { removeFriend } from "../../services/firebase";
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
  following,
}) {
  const activeUser = useContext(UserContext);
  const router = useRouter();
  const { data, loading } = useUser(activeUser?.uid);
  const [isFriend, setIsFriend] = useState(false);
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
    if (!loading) {
      const headers = {
        id: activeUser.uid,
        emailAddress: activeUser.email,
      };
      await handleFollowUser(data?.docId, docId);
      // await axios.post(
      //   "http://localhost:3000/api/users/sendFriendReq",
      //   { senderDocId: data.docId, receiverDocId: docId },
      //   {
      //     headers,
      //   }
      // );
    }
    router.push(`/profile/${userName}`);
  };
  const removeUserFromFollowing = async (e) => {
    e.preventDefault();
    setUnfollowModal(false);
    await removeFriend(data.docId, uid);

    router.push(`/profile/${userName}`);
  };
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
                  <div className="overflow-auto border-4 border-indigo-400 rounded-full md:max-w-fit sm:w-7/12 lg:max-w-fit md:mx-2">
                    <Image
                      className="flex flex-col p-5 bg-white border-t-4 border-indigo-400 rounded-lg lg:flex-row sm:flex-row"
                      src={imgUrl}
                      alt={`${userName} display picture`}
                      height={300}
                      width={300}
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
                            className="px-4 py-3 mt-2 font-medium bg-indigo-500 rounded-2xl lg:max-w-fit"
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
                                    className="px-5 ml-2 font-medium text-white bg-indigo-400 rounded-lg w-fit"
                                    onClick={removeUserFromFollowing}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className="px-3 ml-2 font-medium text-white bg-red-400 rounded-lg w-fit"
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
                          className="px-4 py-3 mt-2 font-medium bg-red-400 rounded-2xl lg:max-w-fit"
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

            <div className="relative flex flex-col p-5 mx-auto overflow-auto bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg max-h-80 ">
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
                    <div className="py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600">
                      {skills.map((skill) => {
                        return (
                          <div
                            key={skill.id}
                            className="w-full px-4 py-2 mt-2 bg-gray-100 shadow-sm rounded-xl"
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
                <p className="py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600">
                  {bio} hello and ya ya ye
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 h-auto p-5 mx-auto -mt-4 bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg lg:mt-10 lg:mr-10 lg:min-h-40 lg:w-1/4 lg:h-2/4">
        <div className="flex flex-row">
          <div className="px-2 text-lg font-semibold text-black md:text-2xl lg:text-3xl">
            Profiles for you{" "}
          </div>
        </div>
        <div className="px-2">
          {" "}
          <p className="py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600">
            {bio} hello and ya ya ye
          </p>
        </div>
      </div>
      <div className="my-4 lg:my-0"></div>
    </div>
  );
}
