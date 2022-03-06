import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User';
import { profilesYouMayKnow } from '../../services/neo4j';
import ListOfProfileYouMayKnow from './ListOfProfileYouMayKnow';

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
  return (
    <div className='px-2'>
      {' '}
      <p className='py-3 text-lg text-gray-500 lg:text-xl hover:text-gray-600'>
        {profiles.length > 0 ? (
          <>
            {profiles.map((profile) => {
              return (
                <ListOfProfileYouMayKnow
                  key={profile.docId}
                  profile={profile}
                />
              );
            })}
          </>
        ) : (
          <>Loading..</>
        )}
      </p>
    </div>
  );
}
