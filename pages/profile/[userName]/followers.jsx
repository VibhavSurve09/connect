import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { UserContext } from "../../../context/User";
import { getFollowers } from "../../../services/neo4j";
import Image from "next/image";
export default function Followers() {
  const [followers, setFollowers] = useState([]);
  const activeUser = useContext(UserContext);
  useEffect(() => {
    getFollowers(activeUser?.uid).then((users) => {
      setFollowers(users);
    });
  }, [activeUser?.uid]);
  return (
    <div className="fixed bottom-0 left-0 flex items-center justify-center w-full h-screen bg-indigo-400">
      <div className="w-1/3 px-8 py-6 text-center bg-white rounded-md">
        <Link href="/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 hover:cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <span className="mb-4 text-3xl italic font-bold underline text-slate-900">
          Your Followers :
        </span>
        <div className="flex items-center justify-center w-full py-3">
          <ul className="w-full divi">
            {/* <li className="text-xl">UserName</li> */}
          </ul>
        </div>
        {followers.length > 0 ? (
          <>
            {followers.map((user, index) => {
              return (
                <div className="flex" key={index}>
                  <Image
                    src={user.photoURL}
                    height={30}
                    width={30}
                    className="rounded-full"
                  />
                  <p>{user.userName}</p>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
