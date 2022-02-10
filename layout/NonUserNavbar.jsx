export default function NonUserNavbar() {
  return (
    <div className='flex flex-row'>
      <div className='px-5 py-2 mr-4 text-xl font-bold text-purple-800  lg:mt-0 hover:text-black'>
        About
      </div>
      <button className='px-4 py-0 text-xl font-bold text-purple-800 bg-white rounded-sm lg:mt-0 hover:text-black hover:bg-gray-100'>
        Login
      </button>
    </div>
  );
}
