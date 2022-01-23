export default function Testpage() {
  return (
    <div className="bg-gray-100 h-auto">
      <div className="w-full text-white bg-main-color">
        <div className="flex flex-row max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              <div className="w-full">
                <div className="bg-white p-5 border-t-4 border-indigo-400 flex lg:flex-row flex-col">
                  <div className="image overflow-hidden md:w-3/12 md:mx-2">
                    <img
                      className="h-auto w-full mx-auto"
                      src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    {" "}
                    <span className="text-gray-900 font-semibold lg:text-5xl leading-8 my-1">
                      NAME
                    </span>
                    <h3 className="text-gray-600 font-lg text-semibold lg:text-2xl leading-6">
                      STUDENT AT ---
                    </h3>
                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 bg-red-300">
                      BIO
                    </p>
                    <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                      <li className="flex items-center py-3">
                        <span>Member since</span>
                        <span className="ml-auto">DATE JOINED</span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>Number of Connections</span>
                        <span className="ml-auto">XXX</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
