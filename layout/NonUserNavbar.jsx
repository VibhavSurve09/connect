import Link from "next/link";

export default function NonUserNavbar() {
  return (
    <div className="flex flex-row justify-end">
      <div className="inline-block lg:mt-0 px-5 py-2 text-purple-800 text-xl hover:text-black font-bold mr-4 ">
        <Link href="#">About</Link>
      </div>
      <button className="inline-block rounded-sm lg:mt-0 px-5 py-2 text-purple-800 text-xl bg-white hover:text-black font-bold hover:bg-gray-100 mr-4">
        <Link href="#">Login</Link>
      </button>
    </div>
  );
}
