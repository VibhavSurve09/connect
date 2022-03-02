import styles from "./Body.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import About from "./About";
import studentImage from "../../public/images/studentsimg.png";
import AuthenticationModal from "../Modal/AuthenticationModal";
import Statistics from "./Statistics";
export default function () {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={`h-max ${styles.bodycolor}`}>
      <div className="lg:flex">
        <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
          <div className="max-w-xl">
            {showModal ? (
              <AuthenticationModal closeButton={setShowModal} />
            ) : null}
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl">
              Build Your New{" "}
              <span className="text-indigo-400 dark:text-blue-400">Idea</span>{" "}
              today
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
              Welcome to your community. Find other students based on your
              preferences and collaborate on projects. Build something
              innovative.
            </p>

            <div
              className={`${
                showModal && "opacity-10"
              } flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row`}
            >
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="block px-3 py-2 text-sm font-semibold text-center text-white transition-colors duration-200 transform bg-indigo-400 rounded-md hover:bg-gray-700"
              >
                Get Started
              </button>

              <button className="block px-3 py-2 text-sm font-semibold text-center text-gray-700 transition-colors duration-200 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-64 lg:w-1/2 lg:h-auto lg:mt-16 lg:ml-20">
          <div className="w-full h-full bg-cover">
            <div className="w-full h-full mt-5">
              <Image
                className={`${showModal && "opacity-10"}`}
                src={studentImage}
                alt="Student Picture"
              />
            </div>
          </div>
        </div>
      </div>
      <About />
      <Statistics />
    </div>
  );
}
