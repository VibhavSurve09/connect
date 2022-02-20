import React, { useEffect } from "react";
import Image from "next/image";
function HeaderInformation({ status, name, profilePicture }) {
  useEffect(() => {
    console.log("Componet Rerendered");
  }, [status]);
  return (
    <div className="px-4 rounded-md bg-indigo-300 py-4 -mt-4">
      <div className="flex flex-row items-center relative">
        <Image
          className="inline-block object-cover w-12 h-12 rounded-full"
          src={profilePicture}
          height={50}
          width={50}
          alt={`${name} profile picture`}
        />
        <span
          className={`absolute inline-block w-3 h-3 ml-10 mt-10 ${
            status && `bg-green-600`
          } border-2 border-white rounded-full ${!status && `bg-red-600`}`}
        ></span>
        <div className="flex flex-col -mt-2">
          <p className="text-xl font-semibold py-2 px-3">{name}</p>
          <div className="ml-3 text-semibold font-serif">
            {status ? "Online" : "Offline "}
          </div>
        </div>
      </div>

      <hr className="mt-3" />
    </div>
  );
}

export default HeaderInformation;
