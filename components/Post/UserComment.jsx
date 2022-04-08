import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getUserByDocId, getUserDataById } from '../../services/firebase';

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
        <div>
          <Image
            src={data[0].photoURL}
            height={100}
            width={100}
            className='rounded-full'
          />
          <p>{data[0].userName}</p>
        </div>
      ) : null}
    </div>
  );
}
