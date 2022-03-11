import { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { UserContext } from "../context/User";
import UserNavbar from "./UserNavbar";
import NonUserNavbar from "./NonUserNavbar";
import Profilepic from "./Profilepic";
import Logo from "../public/images/logo1.png";
import Image from "next/image";
import { useUser } from "../hooks/useUser";
export default function Navbar() {
  const user = useContext(UserContext);
  const { data, loading } = useUser(user?.uid);
  const [isHamburgerActive, setActive] = useState(false);
  return (
    <nav
      className={`w-full px-6 py-3 lg:flex bg-gradient-to-r to-indigo-300 via-indigo-200 from-indigo-50  ${styles.boxshadow}`}
    >
      <div className="flex items-center justify-between">
        <div className="items-center flex-shrink-0 inline-block px-5 py-2 text-xl font-bold text-black">
          <Image src={Logo} height={40} width={165} alt="logo" />
        </div>
      </div>

      <div className="flex items-center float-right lg:hidden -mt-11">
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
          isHamburgerActive ? "max-h-48" : "max-h-0 lg:max-h-32"
        } overflow-auto lg:overflow-visible  w-full items-center flex-grow lg:flex lg:justify-center  lg:px-3`}
      >
        {user && data ? (
          <>
            <UserNavbar userData={data} />
          </>
        ) : (
          <NonUserNavbar />
        )}
      </div>
      {user ? (
        <div
          className={`${
            isHamburgerActive ? "max-h-48" : "max-h-0 lg:max-h-32"
          }  overflow-auto flex-grow lg:flex lg:justify-end ml-2 items-center lg:px-3`}
        >
          <Profilepic userData={data} />
        </div>
      ) : null}
    </nav>
  );
}
