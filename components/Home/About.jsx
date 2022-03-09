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
          <div className="max-w-xl ">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl">
              Who Are{" "}
              <span className="text-indigo-400 dark:text-blue-400">We</span> ?
            </h2>
            <p className="py-4 text-base text-gray-800 dark:text-gray-400 lg:text-base">
              Our developers created <i>ConnectU</i> keeping in mind various
              challenges faced by the students of modern students. Bright
              students often have these great ideas for projects but find it
              burdensome to carry on their thoughts alone.
            </p>
            <p className="py-1 text-base text-gray-800 dark:text-gray-400 lg:text-base">
              <i>ConnectU</i> provides the perfect platform for students to
              connect with other brilliant young minds across the globe and
              build upon their ideas to create something innovative. At
              ConnectU, we believe that learning never stops. According to us,
              education is the most efficient when done with others. We
              encourage brilliant minds of today to put forward their ideas and
              work with other young minds to achieve something beautiful. Our
              purpose is to help geniuses meet other geniuses and show their
              potential to the world. The wait is over! Get started now and show
              us your ideas!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
