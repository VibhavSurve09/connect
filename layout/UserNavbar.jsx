import Link from 'next/link';
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
        <div className='inline-block lg:mt-0 px-5 py-2 text-purple-800 text-xl hover:text-black font-bold mr-4'>
          <Link href='#'>About</Link>
        </div>

        <button
          onClick={handleLogOut}
          className='lg:mt-0 text-base px-5 py-2 leading-none border rounded bg-gray-200 text-black border-black hover:border-transparent font-semibold hover:font-bold hover:text-purple-800 hover:bg-white'
        >
          Sign Out
        </button>
      </div>
      <p>
        Welcome <i>{<b>{userData?.displayName}</b>}</i> !
      </p>
    </>
  );
}
