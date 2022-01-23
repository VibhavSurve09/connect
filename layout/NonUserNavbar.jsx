import Link from "next/link";

export default function NonUserNavbar() {
  return (
    <div className="flex flex-row">
      <div className=" lg:mt-0 px-5 py-2 text-purple-800 text-xl hover:text-black font-bold mr-4">
        About
      </div>
      <button className="rounded-sm lg:mt-0 px-4 py-0 text-purple-800 text-xl bg-white hover:text-black font-bold hover:bg-gray-100">
        Login
      </button>
    </div>
  );
}
