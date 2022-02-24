import Head from 'next/head';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/User';
import { handleFollowUser } from '../../services/firebase';
import { useUser } from '../../hooks/useUser';
export default function Testpage({
  userName,
  bio,
  gender,
  email,
  status,
  followers,
  skills,
  self,
  imgUrl,
  college,
  date,
}) {
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  if (!loading) {
    handleFollowUser(data?.docId, '626Xidd8gBPIoEkUf5y4');
  }

  return (
    <div className='h-auto bg-gray-100'>
      <Head>
        <title>{`${userName} - Connect`}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='w-full text-white bg-main-color'>
        <div className='flex flex-row max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8'>
          <div className='container p-5 mx-auto my-5'>
            <div>
              <div className='w-full shadow-lg'>
                <div className='flex flex-col p-5 bg-white border-t-4 border-indigo-400 rounded-lg lg:flex-row sm:flex-row'>
                  <Image
                    className='flex flex-col p-5 bg-white border-t-4 border-indigo-400 rounded-full lg:flex-row sm:flex-row'
                    src={imgUrl}
                    alt={`${userName} display picture`}
                    height={500}
                    width={600}
                  />
                  {/* </div> */}
                  <div className='w-full py-5 px-7'>
                    {' '}
                    <span className='my-1 font-semibold leading-8 text-gray-900 lg:text-5xl sm:text-2xl md:text-3xl'>
                      {userName}
                    </span>
                    <h3 className='mt-1 leading-6 text-gray-600 font-lg text-semibold lg:text-2xl'>
                      STUDENT AT {college}
                    </h3>
                    <ul className='px-5 py-2 mt-3 text-gray-600 bg-gray-100 divide-y rounded shadow-sm hover:text-gray-700 hover:shadow'>
                      <li className='flex items-center py-3'>
                        <span>Member since</span>
                        <span className='ml-auto'>{date}</span>
                      </li>
                      <li className='flex items-center py-3'>
                        <span>{followers}</span>
                        <span className='ml-auto'>XXX</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='my-6'></div>
            <div className='p-5 mx-auto bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg '>
              <div className='flex flex-row'>
                <div className='text-black'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 lg:mt-2 md:mt-1 sm:mt-0'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div className='px-2 text-lg font-semibold text-black md:text-2xl lg:text-3xl'>
                  About{' '}
                </div>
              </div>
              <div className='w-full px-2'>
                {' '}
                <p className='py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600'>
                  {bio}
                </p>
              </div>
            </div>

            <div className='my-6'></div>

            <div className='p-5 mx-auto bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg '>
              <div className='flex flex-row'>
                <div className='text-black'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 lg:mt-2 md:mt-1 sm:mt-0'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                    />
                  </svg>
                </div>
                <div className='px-2 text-lg font-semibold text-black md:text-2xl lg:text-3xl'>
                  Skills{' '}
                </div>
              </div>
              <div className='w-full px-2'>
                <p className='py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600'></p>
                {skills.map((skill) => {
                  return (
                    <div key={skill.id}>
                      <p className='text-black'>{skill.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='my-6'></div>
            <div className='p-5 mx-auto bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg '>
              <div className='flex flex-row'>
                <div className='text-black'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 lg:mt-2 md:mt-1 sm:mt-0'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path d='M12 14l9-5-9-5-9 5 9 5z' />
                    <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                    />
                  </svg>
                </div>
                <div className='px-2 text-lg font-semibold text-black md:text-2xl lg:text-3xl'>
                  Projects{' '}
                </div>
              </div>
              <div className='w-full px-2'>
                {' '}
                <p className='py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600'>
                  {bio} hello and ya ya ye
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
