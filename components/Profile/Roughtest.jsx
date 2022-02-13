import Head from "next/head";
export default function Testpage({
  userName,
  bio,
  gender,
  email,
  status,
  followers,
}) {
  return (
    <div className="bg-gray-100 h-auto flex lg:flex-row flex-col">
      <Head>
        <title>{`${userName} - Connect`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full lg:max-w-7xl text-white bg-main-color ">
        <div className="flex flex-row max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="container mx-auto my-5 p-5">
            <div>
              <div className="w-full shadow-lg">
                <div className="bg-white p-5 border-t-4 border-indigo-400 flex lg:flex-row sm:flex-row flex-col rounded-lg">
                  <div className="image overflow-hidden md:w-6/12 sm:w-7/12 lg:w-2/6 md:mx-2 rounded-full round border-4 border-indigo-400">
                    <img
                      className="h-auto w-full mx-auto"
                      src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                      alt=""
                    />
                  </div>
                  <div className="w-full px-4 py-5">
                    {" "}
                    <span className="text-gray-900 font-semibold lg:text-5xl sm:text-2xl md:text-3xl leading-8 my-1">
                      {userName}YAYAYES
                    </span>
                    <h3 className="text-gray-600 font-lg text-semibold lg:text-2xl leading-6 mt-1">
                      STUDENT AT ---
                    </h3>
                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 bg-red-300">
                      {bio}
                    </p>
                    <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                      <li className="flex items-center py-3">
                        <span>Member since</span>
                        <span className="ml-auto">DATE JOINED</span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>{followers}</span>
                        <span className="ml-auto">XXX</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-6"></div>
            <div className="bg-white p-5 border-t-4 border-indigo-400 mx-auto shadow-lg rounded-lg ">
              <div className="flex flex-row">
                <div className="text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 lg:mt-2 md:mt-1 sm:mt-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-black font-semibold md:text-2xl lg:text-3xl text-lg px-2">
                  About{" "}
                </div>
              </div>
              <div className="w-full px-2">
                {" "}
                <p className="text-lg lg:text-xl text-gray-500 hover:text-gray-600 py-3">
                  {bio} hello and ya ya ye
                </p>
              </div>
            </div>

            <div className="my-6"></div>

            <div className="bg-white p-5 border-t-4 border-indigo-400 mx-auto shadow-lg rounded-lg ">
              <div className="flex flex-row">
                <div className="text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 lg:mt-2 md:mt-1 sm:mt-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div className="text-black font-semibold md:text-2xl lg:text-3xl text-lg px-2">
                  Skills{" "}
                </div>
              </div>
              <div className="w-full px-2">
                <p className="text-lg lg:text-xl text-gray-500 hover:text-gray-600 py-3">
                  {bio} hello and ya ya ye
                </p>
              </div>
            </div>

            <div className="my-6"></div>
            <div className="bg-white p-5 border-t-4 border-indigo-400 mx-auto shadow-lg rounded-lg ">
              <div className="flex flex-row">
                <div className="text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 lg:mt-2 md:mt-1 sm:mt-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <div className="text-black font-semibold md:text-2xl lg:text-3xl text-lg px-2">
                  Projects{" "}
                </div>
              </div>
              <div className="w-full px-2">
                {" "}
                <p className="text-lg lg:text-xl text-gray-500 hover:text-gray-600 py-3">
                  {bio} hello and ya ya ye
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 border-t-4 border-indigo-400 mx-auto shadow-lg rounded-lg lg:mt-10 -mt-4 h-auto lg:mr-10 lg:min-h-40 w-4/5 lg:w-1/4 lg:h-2/4">
        <div className="flex flex-row">
          <div className="text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6  lg:mt-2 md:mt-1 sm:mt-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div className="text-black font-semibold md:text-2xl lg:text-3xl text-lg px-2">
            Profiles for you{" "}
          </div>
        </div>
        <div className="px-2">
          {" "}
          <p className="text-lg lg:text-xl text-gray-500 hover:text-gray-600 py-3">
            {bio} hello and ya ya ye
          </p>
        </div>
      </div>
      <div className="my-4 lg:my-0"></div>
    </div>
  );
}
