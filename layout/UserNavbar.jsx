import { signOut } from "firebase/auth";
import { auth } from "../constants/firebase";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
export default function UserNavbar({ userData }) {
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
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-row px-5 py-2 mr-4 text-xl font-bold text-purple-800 lg:mt-0 hover:text-black max-h-14">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 mt-2 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input className="w-full px-2 py-1 ml-2 border-2 border-black rounded-2xl"></input>
      </div>
      <div className="inline-block px-5 py-2 mr-4 text-xl font-bold text-purple-800 lg:mt-0 hover:text-black">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-9"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>
      </div>
      <div className="inline-block px-5 py-2 mr-4 text-xl font-bold text-purple-800 lg:mt-0 hover:text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-9"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      </div>
      <div className="inline-block px-5 py-2 mr-4 text-xl font-bold text-purple-800 lg:mt-0 hover:text-black">
        <Link href="/chats">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-9"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
        </Link>
      </div>
      <div className="inline-block px-2 py-1 group">
        <div onClick={(e) => setImageClick(!imageClick)}>
          <div className="cursor-pointer">
            <Image
              src={userData?.photoURL}
              height={42}
              width={42}
              alt="display picture"
              className="rounded-full "
            />
          </div>
        </div>
      </div>
      {imageClick ? (
        <>
          <div className="px-2 py-1 bg-white ">
            <ul>
              <li>
                {" "}
                <i>{<b>{userData?.displayName}</b>}</i>
              </li>
              <li className="px-2 py-2 mr-4 text-xl font-bold ">
                <button
                  onClick={handleLogOut}
                  className="flex justify-center px-5 py-2 text-base font-semibold leading-none text-black bg-gray-200 border border-black rounded lg:mt-0 hover:font-bold hover:text-purple-800 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
