import Logo from "../public/images/logo1.png";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="p-2 border-t-2 border-black bg-zinc-300">
      <div className="flex items-center justify-center py-1 ">
        <div className="flex items-center px-5 py-2 text-xl font-bold text-black">
          <Image src={Logo} height={40} width={165} alt="logo" />
        </div>

        <div className="flex items-center text-sm font-semibold text-gray-800 ">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span className="px-1">connectt.uu@gmail.com</span>
        </div>
      </div>
      <hr className="border-gray-600" />
      <div className="flex justify-center py-3 text-sm font-semibold text-gray-800 ">
        © 2022 ConnectU™ . All Rights Reserved.
      </div>
    </footer>
  );
}
