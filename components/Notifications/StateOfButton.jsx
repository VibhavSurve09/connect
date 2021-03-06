import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User';
import { useUser } from '../../hooks/useUser';
import { doIFollowTheUser, handleFollowUser } from '../../services/firebase';
export default function StateOfButton({ docId, uid, receiverDocId }) {
  const [following, setFollowing] = useState(false);
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  const headers = {
    id: activeUser.uid,
    emailAddress: activeUser.email,
  };
  const followUser = async () => {
    setFollowing(true);
    const notificationData = {
      senderDocId: data.docId,
      receiverDocId: docId,
      senderUserName: data.userName,
      senderPhotoURL: data.photoURL,
    };
    await handleFollowUser(receiverDocId, docId);
    await axios.post(
      `${process.env.API_URI}/api/users/sendFriendReq`,
      { senderDocId: receiverDocId, receiverDocId: docId },
      {
        headers,
      }
    );
    await axios.post(
      `${process.env.API_URI}/api/notifications/following`,
      notificationData,
      { headers }
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
