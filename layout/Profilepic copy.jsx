import React from "react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "../constants/firebase";
import { useState } from "react";
import Link from "next/link";
export default function Profilepic({ userData }) {
  const [imageClick, setImageClick] = useState(false);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="flex flex-row lg:flex-col md:flex-col">
      <div className="px-2 py-1">
        <div onClick={(e) => setImageClick(!imageClick)}>
          <div className="cursor-pointer">
            {userData ? (
              <Image
                src={userData?.photoURL}
                height={45}
                width={45}
                alt="display picture"
                className="rounded-full "
              />
            ) : null}
          </div>
        </div>
      </div>
      <div>
        {imageClick ? (
          <>
            <div className="absolute px-2 py-1 -mt-5 overflow-auto bg-white border-2 border-slate-600 lg:right-11 lg:mt-0 max-h-32">
              <ul>
                <li className="py-1">
                  {" "}
                  <i>
                    <b className="flex flex-row px-2 py-2">
                      <p className="flex flex-col px-2">
                        <span className="flex items-center px-2 hover:text-indigo-600">
                          <u className="text-lg">
                            <Link href="/profile" passHref>
                              {userData?.userName}
                            </Link>
                          </u>
                        </span>
                        <span className="flex justify-center mt-1 bg-indigo-300 rounded-md hover:text-white hover:bg-indigo-400">
                          <Link href={`/profile/${userData.userName}/posts`}>
                            My Posts
                          </Link>
                        </span>
                        <span className="flex justify-center mt-1 bg-indigo-300 rounded-md hover:text-white hover:bg-indigo-400">
                          <Link
                            href={`/profile/${userData.userName}/postsliked`}
                          >
                            Liked Posts
                          </Link>{" "}
                        </span>
                      </p>
                    </b>
                  </i>
                </li>

                <li>
                  <hr />
                </li>
                <li className="flex justify-center">
                  <span className="px-2 mt-1 text-base bg-red-500 rounded-md hover:text-white hover:bg-red-400 w-fit">
                    <b>
                      <Link href={`/profile/${userData.userName}/posts`}>
                        Delete Profile
                      </Link>
                    </b>
                  </span>
                </li>
                <li>
                  <hr />
                </li>

                <li className="flex justify-center px-2 py-2 text-xl font-bold ">
                  <button
                    onClick={handleLogOut}
                    className="px-5 py-2 text-base font-semibold leading-none text-black bg-gray-200 border border-black rounded lg:mt-0 hover:font-bold hover:text-indigo-600 hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
