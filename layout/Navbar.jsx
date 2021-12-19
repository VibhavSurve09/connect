export default function Navbar() {
  return (
    <div>
      <nav className='flex items-center justify-between flex-wrap bg-red-500 p-6'>
        <div className='flex items-center flex-shrink-0 text-black mr-6'>
          <svg
            className='fill-current h-8 w-8 mr-2'
            width='54'
            height='54'
            viewBox='0 0 54 54'
            xmlns='http://www.w3.org/2000/svg%22%3E'
          >
            <path d='M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z' />
          </svg>
          <span className='font-bold text-xl '>
            <h1 className='hover:font-black'>
              <a href='#'>ConnectU📱</a>
            </h1>
          </span>
        </div>

        <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
          <div className='text-sm lg:flex-grow'>
            <a
              href='#responsive-header'
              className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 text-xl hover:text-black ml-10 mr-4 hover:font-semibold hover:text-2xl font-medium'
            >
              Home
            </a>
            <a
              href='#responsive-header'
              className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 text-xl hover:text-black ml-2 mr-4 hover:font-semibold hover:text-2xl font-medium'
            >
              About
            </a>
          </div>
          <div>
            <a
              href='#'
              className='inline-block text-base px-5 py-2 leading-none border rounded bg-gray-200 text-black border-black hover:border-transparent font-semibold hover:text-blue-400 hover:font-black hover:bg-white mt-4 lg:mt-0'
            >
              Log in
            </a>

            <a
              href='#'
              className='inline-block text-base px-5 py-2 leading-none border rounded bg-gray-200 text-black border-black hover:border-transparent font-semibold hover:text-blue-400 hover:font-black hover:bg-white mt-4 lg:mt-0 ml-4'
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
