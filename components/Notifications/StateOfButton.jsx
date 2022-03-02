import React, { useState } from 'react';
import { doIFollowTheUser, handleFollowUser } from '../../services/firebase';
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
    <div>
      {following ? (
        <p>Following..</p>
      ) : (
        <button onClick={followUser}>Follow back</button>
      )}
    </div>
  );
}
