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
      <div className="w-1/3 px-8 py-6 overflow-auto text-center bg-white rounded-md shadow-lg max-h-96">
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
        <span className="mb-4 text-2xl italic font-bold underline text-slate-900">
          Your Followers :
        </span>
        <div className="flex justify-center">
          {followers.length > 0 ? (
            <div className="flex flex-col">
              {followers.map((user, index) => {
                return (
                  <div className="flex items-center w-full py-4" key={index}>
                    <Image
                      src={user.photoURL}
                      height={40}
                      width={40}
                      className="rounded-full"
                      alt=""
                    />

                    <div className="px-3 text-xl font-semibold">
                      {user.userName}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="font-serif">
              No Followers Yet! Connect With More People!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
