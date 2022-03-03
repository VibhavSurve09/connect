import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
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
          <div
            key={index}
            className='flex flex-row items-center py-3 mt-2 mb-2 bg-white border-t-4 border-indigo-600 rounded-lg shadow-xl rw-full'
          >
            <div className='ml-10'>
              <Image
                src={notification.senderPhotoURL}
                alt={`${notification.senderUserName} display picture`}
                height={65}
                width={65}
                className='flex justify-start ml-5 rounded-full'
              />
            </div>
            <div className='ml-5'>
              <p className='font-serif text-base font-medium lg:text-xl'>
                <i>
                  {' '}
                  <Link href={`/profile/${notification.senderUserName}`}>
                    {notification.senderUserName}
                  </Link>
                </i>{' '}
                started following you
              </p>
              <StateOfButton
                key={index}
                docId={notification.senderDocId}
                uid={data?.uid}
                receiverDocId={notification.receiverDocId}
              />{' '}
              <div className='flex'>
                <p className='ml-3 font-serif text-base font-medium text-gray-400 lg:text-sm'>
                  {moment(notification.createdAt).format('LT')}
                </p>
                <p className='ml-3 font-serif text-base font-medium text-gray-400 lg:text-sm'>
                  {moment(notification.createdAt).format('DD/MM/YYYY')}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default React.memo(NotificationList);
