import { signOut } from 'firebase/auth';
import { auth } from '../constants/firebase';
import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/User';
import SearchList from '../components/Search/SearchList';
export default function UserNavbar({ userData }) {
  const [searchText, setSearchText] = useState('');
  const [searchUserData, setSearchUserData] = useState([]);
  const activeUser = useContext(UserContext);
  let cancelToken;
  const reqHeader = {
    id: activeUser?.uid,
    emailAddress: activeUser?.email,
  };
  const onType = async (e) => {
    setSearchText(e.target.value);
    let users;
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel();
    }
    cancelToken = axios.CancelToken.source();
    if (searchText.trim() != '') {
      users = await axios.get(
        `${process.env.API_URI}/api/users/${searchText}`,
        {
          headers: reqHeader, //Passing the headears with every api call to authenticate every request from the users browser
        },
        { cancelToken: cancelToken.token }
      );
      // console.log(users.data);
      setSearchUserData(users.data);
    }
  };
  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='flex flex-row px-5 py-2 mr-4 text-xl font-bold text-purple-800 lg:mt-0 hover:text-black max-h-14'>
        <div className='relative mr-3 md:mr-0 md:block'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              className='w-5 h-5 text-gray-500'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <div className='group'>
            <input
              type='text'
              value={searchText}
              id='email-adress-icon'
              className='block w-full p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg group bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search Username'
              onChange={onType}
              autoComplete='off'
            ></input>
            {/* {searchText} */}
            {searchUserData.length > 0 ? (
              <div
                className='invisible overflow-auto bg-white border-2 border-gray-400 h-fit group-hover:visible max-h-14'
                aria-autocomplete='none'
              >
                {searchUserData.map((user, index) => (
                  <SearchList user={user} key={index} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className='inline-block px-5 py-2 mr-4 text-xl font-bold text-indigo-600 cursor-pointer lg:mt-0 hover:text-black hover:animate-pulse'>
        <Link href='/'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-10 h-9'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
          </svg>
        </Link>
      </div>
      <div className='inline-block px-5 py-2 mr-4 text-xl font-bold text-indigo-600 cursor-pointer lg:mt-0 hover:text-black hover:animate-pulse'>
        <Link href='/notifications'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-10 h-9'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
          </svg>
        </Link>
      </div>
      <div className='inline-block px-5 py-2 mr-4 text-xl font-bold text-indigo-600 cursor-pointer lg:mt-0 hover:text-black hover:animate-pulse'>
        <Link href='/chats'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-10 h-9'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z' />
            <path d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z' />
          </svg>
        </Link>
      </div>
    </div>
  );
}
