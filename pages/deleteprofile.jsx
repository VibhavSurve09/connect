import React, { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../context/User';
import { deleteProfileFB, getUserDataById } from '../services/firebase';
import { deleteProfile } from '../services/neo4j';
import { useUser } from '../hooks/useUser';
import { auth } from '../constants/firebase';
import { signOut } from 'firebase/auth';
export default function DeleteProfile({ closeButton }) {
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  const deleteProfilee = async () => {
    await deleteProfile(activeUser?.uid);
    await deleteProfileFB(data.docId);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className='fixed bottom-0 left-0 flex items-center justify-center w-full h-full bg-indigo-400'>
      <div className='px-16 text-center bg-white rounded-md py-14'>
        <div className='flex justify-center'></div>
        <h1 className='mb-4 text-xl font-bold text-slate-500'>
          Are You Sure You Want To{' '}
          <span className='italic text-black underline'>Delete</span> Your
          Profile?
        </h1>
        <p className='text-base font-medium text-slate-400'>
          This change is permanent and can not be reversed.
        </p>
        <br />
        <button
          onClick={deleteProfilee}
          className='px-2 py-2 font-semibold text-white bg-red-500 rounded-md text-md hover:bg-red-400 hover:text-black hover:font-bold'
        >
          Delete My Profile
        </button>
        <span className='px-4 py-2 ml-2 font-semibold text-white bg-indigo-500 rounded-md text-md hover:text-black hover:font-bold'>
          {' '}
          <Link href='/profile'>Cancel</Link>
        </span>
      </div>
    </div>
  );
}
