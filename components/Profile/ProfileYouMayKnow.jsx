import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User';
import { profilesYouMayKnow } from '../../services/neo4j';

export default function ProfileYouMayKnow({ uid }) {
  const activeUser = useContext(UserContext);
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    if (activeUser) {
      profilesYouMayKnow(activeUser?.uid, uid).then((profiles) => {
        setProfiles(profiles);
      });
    }
  }, [activeUser]);
  console.log(profiles);
  return (
    <div className='px-2'>
      {' '}
      <p className='py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600'>
        Coming soon..
      </p>
    </div>
  );
}
