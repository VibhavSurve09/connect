import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User';
import { useUser } from '../../hooks/useUser';
import StateOfButton from './StateOfButton';
import moment from 'moment';
function NotificationList({ notifications }) {
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  useEffect(() => {}, [data]);
  return (
    <>
      {notifications.map((notification, index) => {
        return (
          <div key={index} className='flex '>
            <Image
              src={notification.senderPhotoURL}
              alt={`${notification.senderUserName} display picture`}
              height={50}
              width={50}
              className='rounded-full'
            />
            <p>{notification.senderUserName} started following you</p>
            <p>{moment(notification.createdAt).format('LT')}</p>
            <StateOfButton
              key={index}
              docId={notification.senderDocId}
              uid={data?.uid}
              receiverDocId={notification.receiverDocId}
            />
          </div>
        );
      })}
    </>
  );
}

export default React.memo(NotificationList);
