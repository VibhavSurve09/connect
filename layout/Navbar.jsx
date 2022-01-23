import Link from "next/link";
import { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { UserContext } from "../context/User";
import profileImagePlaceHolder from "../public/images/avatar.webp";
import UserNavbar from "./UserNavbar";
import NonUserNavbar from "./NonUserNavbar";
export default function Navbar() {
  const user = useContext(UserContext);
  const [isHamburgerActive, setActive] = useState(false);
  return (
    <nav
      className={`w-full px-6 py-3 lg:flex  lg:items-center bg-gradient-to-r to-indigo-300 via-indigo-200 from-indigo-50 ${styles.boxshadow}`}
    >
      <div className="flex items-center justify-between">
        <div className="font-bold text-black text-xl items-center flex-shrink-0 inline-block px-5 py-2m">
          <h1>📱 ConnectU</h1>
        </div>
      </div>

      <div className="flex lg:hidden float-right -mt-7">
        <button
          type="button"
          className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
          aria-label="toggle menu"
          onClick={() => setActive(!isHamburgerActive)}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path
              fillRule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`${
          isHamburgerActive ? "max-h-44" : "max-h-0 lg:max-h-32"
        }  transition-all overflow-hidden duration-500 menu w-full flex-grow lg:flex lg:justify-end lg:w-auto lg:px-3`}
      >
        {user ? (
          <>
            <UserNavbar userData={user} />
          </>
        ) : (
          <NonUserNavbar />
        )}
      </div>
    </nav>
  );
}
