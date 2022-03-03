import styles from "./Body.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import studentImage from "../../public/images/aboutus.png";
import AuthenticationModal from "../Modal/AuthenticationModal";

export default function ({ modalState }) {
  return (
    <div className={`h-max ${styles.bodycolor}`} id="about">
      <div className="lg:flex">
        <div className="w-full h-64 lg:w-1/2 lg:h-auto lg:mt-16 lg:ml-20">
          <div className="w-full h-full bg-cover">
            <div className="w-full h-full">
              {modalState ? (
                <>
                  {console.log(modalState)}
                  <Image
                    className={`${modalState && "opacity-5"}`}
                    src={studentImage}
                    alt="About us"
                  />
                </>
              ) : (
                <Image src={studentImage} alt="About us" />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl">
              Who Are{" "}
              <span className="text-indigo-400 dark:text-blue-400">We</span> ?
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
              Welcome to your community. Find other students based on your
              preferences and collaborate on projects. Build something
              innovative.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
