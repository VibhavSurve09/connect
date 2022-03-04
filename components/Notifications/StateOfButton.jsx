import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User';
import { doIFollowTheUser, handleFollowUser } from '../../services/firebase';
export default function StateOfButton({ docId, uid, receiverDocId }) {
  const [following, setFollowing] = useState(false);
  const activeUser = useContext(UserContext);
  const headers = {
    id: activeUser.uid,
    emailAddress: activeUser.email,
  };
  const followUser = async () => {
    setFollowing(true);
    await handleFollowUser(receiverDocId, docId);
    await axios.post(
      `${process.env.API_URI}/api/users/sendFriendReq`,
      { senderDocId: receiverDocId, receiverDocId: docId },
      {
        headers,
      }
    );
  };
  useEffect(() => {
    doIFollowTheUser(docId, uid).then((res) => {
      if (res) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    });
  }, []);

  return (
    <div className='ml-3 font-serif text-base font-medium lg:text-xl'>
      {following ? (
        <p className='px-2 py-1 bg-indigo-300 rounded-lg w-fit'> Following</p>
      ) : (
        <button
          className='px-2 py-1 bg-red-300 rounded-lg'
          onClick={followUser}
        >
          Follow back
        </button>
      )}
    </div>
  );
}
