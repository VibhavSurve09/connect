import axios from 'axios';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/User';
import { useUser } from '../../hooks/useUser';
import { handleFollowUser } from '../../services/firebase';

export default function ListOfProfileYouMayKnow({ profile }) {
  const [follow, setFollow] = useState(false);
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  const addFriend = async () => {
    setFollow(true);
    if (!loading) {
      const headers = {
        id: activeUser.uid,
        emailAddress: activeUser.email,
      };
      await handleFollowUserowUser(data?.docId, profile.docId);
      await axios.post(
        `${process.env.API_URI}/api/users/sendFriendReq`,
        { senderDocId: data.docId, receiverDocId: profile.docId },
        {
          headers,
        }
      );
      const notificationData = {
        senderDocId: data.docId,
        receiverDocId: profile.docId,
        senderUserName: data.userName,
        senderPhotoURL: data.photoURL,
      };
      await axios.post(
        `${process.env.API_URI}/api/notifications/following`,
        notificationData,
        { headers }
      );
      router.push(`/profile/${userName}`);
    }
  };
  return (
    <>
      <Image
        src={profile.photoURL}
        alt={`${profile.userName} display picture`}
        height={20}
        width={20}
      />
      <>{profile.userName}</>
      <button onClick={addFriend}>Follow</button>
    </>
  );
}
