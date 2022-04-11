import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User";
import { profilesYouMayKnow, randomUsers } from "../../services/neo4j";
import ListOfProfileYouMayKnow from "./ListOfProfileYouMayKnow";

export default function ProfileYouMayKnow({ uid, isFriend }) {
  const activeUser = useContext(UserContext);
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    if (activeUser) {
      profilesYouMayKnow(activeUser?.uid, uid, isFriend).then((profiles) => {
        setProfiles(profiles);
      });
      // if (profiles.length <= 0) {
      //   console.log('Random User Call');
      //   randomUsers(uid).then((prof) => {
      //     setProfiles(prof);
      //   });
      // }
    }
  }, [activeUser, isFriend]);
  return (
    <div className="px-2 py-3">
      {" "}
      <div className="flex flex-col items-center px-3 py-3 text-lg text-gray-500 rounded-md lg:text-xl hover:text-gray-600">
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
          <p className="font-serif text-xl text-slate-800">Loading..</p>
        )}
      </div>
    </div>
  );
}
