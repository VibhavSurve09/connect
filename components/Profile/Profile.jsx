import Head from 'next/head';
import Image from 'next/image';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/User';
import { useUser } from '../../hooks/useUser';
import { editUserAbout } from '../../services/firebase';
import { useRouter } from 'next/router';
export default function Profile({
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
  docId,
  uid,
  following,
  projects,
}) {
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  const router = useRouter();
  //*About
  const [aboutEdit, setAboutEdit] = useState(false);
  const [changeAbout, setChangeAbout] = useState(bio);
  const editAbout = (e) => {
    setAboutEdit(false);
    editUserAbout(docId, changeAbout);
    router.push(`/profile`);
  };
  // useEffect(() => {}, [bio]);
  return (
    <div className='flex flex-col h-auto bg-gray-100 lg:flex-row'>
      <Head>
        <title>{`${userName} - Connect`}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='w-full text-white lg:max-w-7xl bg-main-color '>
        <div className='flex flex-row max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8'>
          <div className='container p-5 mx-auto my-5'>
            <div className='relative flex flex-col group'>
              <div className='w-full shadow-lg'>
                <div className='flex flex-col p-5 bg-white border-t-4 border-indigo-400 rounded-lg lg:flex-row sm:flex-row'>
                  <div className='overflow-auto md:max-w-fit sm:w-7/12 lg:max-w-fit md:mx-2'>
                    <Image
                      className='flex flex-col p-5 bg-white border-t-4 border-indigo-400 rounded-full lg:flex-row sm:flex-row'
                      src={imgUrl}
                      alt={`${userName} display picture`}
                      height={300}
                      width={300}
                    />
                  </div>
                  <div className='w-full px-4 py-5'>
                    {' '}
                    <span className='my-1 font-semibold leading-8 text-gray-900 lg:text-5xl sm:text-2xl md:text-3xl'>
                      {userName}
                    </span>
                    <h3 className='mt-1 leading-6 text-gray-600 font-lg text-semibold lg:text-2xl'>
                      STUDENT AT {college}
                    </h3>{' '}
                    <span className='sm:w-full md:w-full'></span>
                    <ul className='px-3 py-2 mt-3 text-gray-600 bg-gray-100 divide-y rounded shadow-sm hover:text-gray-700 hover:shadow'>
                      <li className='flex items-center py-3'>
                        <span>Member since</span>
                        <span className='ml-auto'>{date}</span>
                      </li>
                      <li className='flex items-center py-3'>
                        <span>Followers: {followers}</span>
                        <span className='ml-auto'>Following: {following}</span>
                      </li>
                    </ul>
                    <div className='absolute flex flex-row bottom-4 right-4'>
                      <button className='px-5 py-2 ml-2 font-medium text-white bg-indigo-400 rounded-lg hover:bg-indigo-600 w-fit'>
                        Save
                      </button>
                      <button className='px-3 py-2 ml-2 font-medium text-white bg-red-400 rounded-lg w-fit hover:bg-red-500'>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='absolute top-0 right-0 left-auto z-auto flex justify-end invisible px-2 py-2 text-black hover:text-gray-600 group-hover:visible'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                  />
                </svg>
              </div>
            </div>

            <div className='my-6'></div>
            <div className='relative flex flex-col p-5 mx-auto bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg group'>
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
                {!aboutEdit ? (
                  changeAbout.trim().length > 0 ? (
                    <p className='py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600'>
                      {changeAbout}
                    </p>
                  ) : (
                    <>
                      {' '}
                      <p className='py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600'>
                        {bio}
                      </p>
                    </>
                  )
                ) : (
                  <input
                    className='w-full px-2 py-3 text-lg text-black border-b-2 border-gray-500 lg:text-xl hover:text-gray-600'
                    value={changeAbout}
                    type='text'
                    onChange={(e) => setChangeAbout(e.target.value)}
                    pattern='.{3,}'
                    required
                    title='3 characters minimum'
                  />
                )}
              </div>
              <div className='absolute top-0 right-0 left-auto z-auto flex justify-end invisible px-2 py-2 text-black hover:text-gray-600 group-hover:visible'>
                <button onClick={(e) => setAboutEdit(true)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                    />
                  </svg>
                </button>
              </div>
              {aboutEdit ? (
                <>
                  <div className='flex flex-row justify-end'>
                    <button
                      className='px-5 py-2 ml-2 font-medium text-white bg-indigo-400 rounded-lg hover:bg-indigo-600 w-fit'
                      onClick={editAbout}
                    >
                      Save
                    </button>
                    <button
                      className='px-3 py-2 ml-2 font-medium text-white bg-red-400 rounded-lg w-fit hover:bg-red-500'
                      onClick={(e) => setAboutEdit(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : null}
            </div>
            <div className='my-6'></div>

            <div className='relative flex flex-col p-5 mx-auto bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg group '>
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
                <div className='py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600'>
                  <div className='w-full px-2'>
                    <div className='py-3 overflow-auto text-lg text-gray-500 lg:text-xl hover:text-gray-600 max-h-72'>
                      {skills.map((skill) => {
                        return (
                          <div
                            key={skill.id}
                            className='w-full px-4 py-2 mt-2 bg-gray-100 shadow-md rounded-xl'
                          >
                            <p className='text-black'>{skill.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className='absolute top-0 right-0 left-auto z-auto flex justify-end invisible px-2 py-2 text-black hover:text-gray-600 group-hover:visible'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                  />
                </svg>
              </div>
              <div className='flex flex-row justify-end'>
                <button className='px-5 py-2 ml-2 font-medium text-white bg-indigo-400 rounded-lg w-fit hover:bg-indigo-600'>
                  Save
                </button>
                <button className='px-3 py-2 ml-2 font-medium text-white bg-red-400 rounded-lg w-fit hover:bg-red-500'>
                  Cancel
                </button>
              </div>
            </div>

            <div className='my-6'></div>
            <div className='relative flex flex-col p-5 mx-auto bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg group'>
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
              <div className='absolute top-0 right-0 left-auto z-auto flex justify-end invisible px-2 py-2 text-black hover:text-gray-600 group-hover:visible'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                  />
                </svg>
              </div>
              <div className='flex flex-row justify-end'>
                <button className='px-5 py-2 ml-2 font-medium text-white bg-indigo-400 rounded-lg w-fit hover:bg-indigo-600'>
                  Save
                </button>
                <button className='px-3 py-2 ml-2 font-medium text-white bg-red-400 rounded-lg w-fit hover:bg-red-500'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-4/5 h-auto p-5 mx-auto -mt-4 bg-white border-t-4 border-indigo-400 rounded-lg shadow-lg lg:mt-10 lg:mr-10 lg:min-h-40 lg:w-1/4 lg:h-2/4'>
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
                d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          </div>
          <div className='px-2 text-lg font-semibold text-black md:text-2xl lg:text-3xl'>
            Profiles for you{' '}
          </div>
        </div>
        <div className='px-2'>
          {' '}
          <p className='py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600'>
            {bio} hello and ya ya ye
          </p>
        </div>
      </div>
      <div className='my-4 lg:my-0'></div>
    </div>
  );
}
