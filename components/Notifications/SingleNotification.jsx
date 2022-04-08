import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/User';
import { getUserByDocId } from '../../services/firebase';
import StateOfButton from './StateOfButton';

function SingleNotification({ notification }) {
  const activeUser = useContext(UserContext);
  const [postOwnerData, setPostOwernData] = useState({});
  useEffect(() => {
    getUserByDocId(notification.senderDocId).then((user) => {
      setPostOwernData(user);
    });
  }, [notification._id]);
  return (
    <div>
      <div className='ml-10'>
        <Image
          src={
            postOwnerData?.photoURL
              ? postOwnerData.photoURL
              : notification.senderphotoURL
          }
          alt={`${
            postOwnerData?.userName
              ? postOwnerData.userName
              : notification.senderUserName
          } display picture`}
          height={65}
          width={65}
          className='flex justify-start ml-5 rounded-full'
        />
      </div>
      <div className='ml-5'>
        <p className='font-serif text-base font-medium lg:text-xl'>
          <i>
            {' '}
            <Link
              href={`/profile/${
                postOwnerData?.userName
                  ? postOwnerData.userName
                  : notification.senderUserName
              }`}
            >
              {postOwnerData?.userName
                ? postOwnerData.userName
                : notification.senderUserName}
            </Link>
          </i>{' '}
          started following you
        </p>
        <StateOfButton
          docId={notification.senderDocId}
          uid={activeUser?.uid}
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
}

export default SingleNotification;
