import Link from 'next/link';
import styles from "./Navbar.module.css";
export default function Navbar() {
  return (
      <nav className={`flex items-center justify-between flex-wrap bg-gradient-to-r to-indigo-300 via-indigo-200 from-indigo-50 p-6 relative ${styles.random2}`}>
      
          <div className={`text-sm relative ${styles.random}`}>

          <div
              className='font-bold text-black text-xl items-center flex-shrink-0 inline-block px-5 py-2 font-serif'
            >
            <h1>
              <Link href='#'>📱 ConnectU</Link>
            </h1>
            </div>
          </div>

          <div className={styles.random1}>
          <div
              className='inline-block lg:mt-0 px-5 py-2 text-purple-800 text-xl hover:text-black font-bold mr-4'
            >
              <Link href='#'>
              About
              </Link>
            </div>
            <div
              className='inline-block lg:mt-0 text-base px-5 py-2 leading-none border rounded bg-gray-200 text-black border-black hover:border-transparent font-semibold hover:text-purple-800 hover:font-black hover:bg-white'
            >
              <Link href='#'>
              Log in
              </Link>
            </div>

            <div
              className='inline-block lg:mt-0 text-base px-5 py-2 leading-none border rounded bg-gray-200 text-black border-black hover:border-transparent font-semibold hover:text-purple-800 hover:font-black hover:bg-white ml-4'
            >
              <Link href='#'>
              Sign Up
              </Link>
            </div>
          </div>
       
      </nav>
  );
}
