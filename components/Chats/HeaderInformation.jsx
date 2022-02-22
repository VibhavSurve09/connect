import React, { useEffect } from 'react';
import Image from 'next/image';
function HeaderInformation({ status, name, profilePicture }) {
  console.log(profilePicture);
  return (
    <div className='px-4 py-4 -mt-4 bg-indigo-300 rounded-md'>
      <div className='relative flex flex-row items-center'>
        {profilePicture ? (
          <>
            {' '}
            <Image
              className='inline-block object-cover w-12 h-12 rounded-full'
              src={profilePicture}
              height={50}
              width={50}
              alt={`${name} profile picture`}
            />
            <span
              className={`absolute inline-block w-3 h-3 ml-10 mt-10 ${
                status && `bg-green-600`
              } border-2 border-white rounded-full ${!status && `bg-red-600`}`}
            ></span>
          </>
        ) : null}

        <div className='flex flex-col -mt-2'>
          <p className='px-3 py-2 text-xl font-semibold'>{name}</p>
          <div className='ml-3 font-serif text-semibold'>
            {status ? 'Online' : 'Offline '}
          </div>
        </div>
      </div>

      <hr className='mt-3' />
    </div>
  );
}

export default HeaderInformation;
