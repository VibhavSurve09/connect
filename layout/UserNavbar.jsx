import { signOut } from 'firebase/auth';
import { auth } from '../constants/firebase';
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
    <>
      <div>
        <div className='inline-block px-5 py-2 mr-4 text-xl font-bold text-purple-800 lg:mt-0 hover:text-black'>
          About
        </div>

        <button
          onClick={handleLogOut}
          className='px-5 py-2 text-base font-semibold leading-none text-black bg-gray-200 border border-black rounded lg:mt-0 hover:border-transparent hover:font-bold hover:text-purple-800 hover:bg-white'
        >
          Sign Out
        </button>
      </div>
      <p className='px-3 py-2 ml-3 bg-white border-2 border-indigo-900'>
        Welcome <i>{<b>{userData?.displayName}</b>}</i> !
      </p>
    </>
  );
}
