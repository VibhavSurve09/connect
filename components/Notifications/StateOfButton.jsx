import React, { useState } from "react";
import { doIFollowTheUser, handleFollowUser } from "../../services/firebase";
export default function StateOfButton({ docId, uid, receiverDocId }) {
  const [following, setFollowing] = useState(false);
  const followUser = async () => {
    setFollowing(true);
    await handleFollowUser(receiverDocId, docId);
  };
  doIFollowTheUser(docId, uid).then((res) => {
    if (res) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  });

  return (
    <div className="ml-3 font-serif text-base font-medium lg:text-xl">
      {following ? (
        <p className="px-2 py-1 bg-indigo-300 rounded-lg w-fit"> Following</p>
      ) : (
        <button
          className="px-2 py-1 bg-red-300 rounded-lg"
          onClick={followUser}
        >
          Follow back
        </button>
      )}
    </div>
  );
}
