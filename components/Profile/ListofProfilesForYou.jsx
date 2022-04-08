import axios from 'axios';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/User';
import { useUser } from '../../hooks/useUser';
import { handleFollowUser } from '../../services/firebase';

export default function ListOfProfilesForYou({ profile }) {
  const [follow, setFollow] = useState(false);
  const activeUser = useContext(UserContext);
  const [following, setFollowing] = useState('Follow');
  const { data, loading } = useUser(activeUser?.uid);
  const addFriend = async () => {
    setFollow(true);
    setFollowing('Following..');
    if (!loading) {
      const headers = {
        id: activeUser.uid,
        emailAddress: activeUser.email,
      };
      await handleFollowUser(data?.docId, profile.docId);
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
    }
  };
  return (
    <div className='flex flex-col w-full py-2 mt-3 overflow-auto bg-gray-100 border-2 border-indigo-400 lg:max-h-screen'>
      <div className='flex items-center justify-center px-2'>
        <Image
          src={profile.photoURL}
          alt={`${profile.userName} display picture`}
          height={90}
          width={90}
          className='rounded-full'
        />
      </div>

      <div className='flex justify-center px-2 font-serif text-xl font-semibold'>
        {profile.userName}
      </div>
      <div className='flex justify-center text-black hover:text-gray-600'>
        <button
          onClick={addFriend}
          className='px-2 py-1 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500'
        >
          {following}
        </button>
      </div>
    </div>
  );
}
