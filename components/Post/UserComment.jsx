import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getUserByDocId, getUserDataById } from "../../services/firebase";

export default function UserComment({ uid }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getUserDataById(uid).then((data) => {
      setData(data);
    });
  }, [uid]);
  return (
    <div>
      {data.length > 0 ? (
        <div className="flex flex-row items-center">
          <div className="mt-2">
            <Image
              src={data[0].photoURL}
              height={35}
              width={35}
              className="rounded-full"
            />
          </div>
          <p className="px-2">
            <b>{data[0].userName}</b>
          </p>
        </div>
      ) : null}
    </div>
  );
}
