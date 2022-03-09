import React from "react";
import Image from "next/image";
import Link from "next/link";
function SearchList({ user }) {
  return (
    <div className="flex flex-row px-2 py-1 font-normal border-b-2 border-gray-400">
      <div className="flex items-center px-2">
        <Image
          src={user.photoURL}
          height={25}
          width={25}
          alt="display pic"
          className="rounded-full"
        ></Image>
      </div>
      <div className="flex items-center px-1 cursor-pointer">
        <Link href={`/profile/${user.userName}`}>
          <p className="font-mono"> {user.userName}</p>
        </Link>
      </div>
    </div>
  );
}

export default SearchList;
