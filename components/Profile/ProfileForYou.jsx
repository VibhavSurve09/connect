import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User';
import { profilesForYou, randomUsers } from '../../services/neo4j';
import ListOfProfilesForYou from './ListofProfilesForYou';

function ProfileForYou({ uid }) {
  const activeUser = useContext(UserContext);
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    if (activeUser) {
      profilesForYou(uid).then((profiles) => {
        setProfiles(profiles);
      });
      // if (profiles.length <= 0) {
      //   // console.log('Random User Call');
      //   randomUsers(uid).then((prof) => {
      //     setProfiles(prof);
      //   });
      // }
    }
  }, [activeUser]);

  return (
    <div className='px-2 py-3'>
      {' '}
      <p className='flex flex-col items-center px-3 py-3 text-lg text-gray-500 rounded-md lg:text-xl hover:text-gray-600'>
        {profiles.length > 0 ? (
          <>
            {profiles.map((profile) => {
              return (
                <ListOfProfilesForYou key={profile.docId} profile={profile} />
              );
            })}
          </>
        ) : (
          <>Try choosing some other skills..</>
        )}
      </p>
    </div>
  );
}

export default ProfileForYou;
