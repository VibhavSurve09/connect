import { signOut } from "firebase/auth";
import { auth } from "../constants/firebase";
export default function UserNavbar({ userData }) {
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
      <div className="inline-block px-5 py-2 mr-4 text-xl font-bold text-purple-800 lg:mt-0 hover:text-black">
        About
      </div>
      <div className="inline-block px-2 py-2 mr-4 text-xl font-bold ">
        <button
          onClick={handleLogOut}
          className="px-5 py-2 text-base font-semibold leading-none text-black bg-gray-200 border border-black rounded lg:mt-0 hover:border-transparent hover:font-bold hover:text-purple-800 hover:bg-white"
        >
          Sign Out
        </button>
      </div>
      <div className="my-1 lg:my-0"></div>
      <div className="inline-block px-2 py-1">
        <p className="px-3 py-2 ml-3 bg-white border-2 border-indigo-900">
          Welcome <i>{<b>{userData?.displayName}</b>}</i> !
        </p>
      </div>
    </div>
  );
}
