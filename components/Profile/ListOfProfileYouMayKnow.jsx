import axios from "axios";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/User";
import { useUser } from "../../hooks/useUser";
import { handleFollowUser } from "../../services/firebase";

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
    <div className="flex flex-row items-center">
      <div className="flex items-center">
        <Image
          src={profile.photoURL}
          alt={`${profile.userName} display picture`}
          height={30}
          width={30}
          className="rounded-full"
        />
      </div>
      <div className="px-2 font-medium">{profile.userName}</div>
      <div className="flex justify-end text-black hover:text-gray-600">
        <button
          onClick={addFriend}
          className="px-2 py-1 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
        >
          Follow
        </button>
      </div>
    </div>
  );
}
