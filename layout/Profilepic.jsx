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
            <div className="absolute px-2 py-1 -mt-5 bg-white border-2 border-slate-600 lg:right-11 lg:mt-0">
              <ul>
                <li className="py-1">
                  {" "}
                  <i>
                    <b className="flex flex-row px-2 py-3">
                      <p className="flex items-center">
                        <Image
                          src={userData?.photoURL}
                          height={40}
                          width={40}
                          alt="display picture"
                          className="rounded-full "
                        />
                      </p>
                      <p className="flex flex-col px-2">
                        <span className="flex items-center px-2">
                          {userData?.displayName}
                        </span>
                        <span className="flex justify-center mt-1 bg-indigo-300 rounded-md hover:bg-indigo-400">
                          {" "}
                          <Link href="/profile">View Profile</Link>{" "}
                        </span>
                      </p>
                    </b>
                  </i>
                </li>

                <li>
                  <hr />
                </li>
                <li className="flex justify-center px-2 py-2 mr-4 text-xl font-bold ">
                  <button
                    onClick={handleLogOut}
                    className="px-5 py-2 text-base font-semibold leading-none text-black bg-gray-200 border border-black rounded lg:mt-0 hover:font-bold hover:text-purple-800 hover:bg-gray-50"
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
