import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { UserContext } from '../../context/User';
import { useUser } from '../../hooks/useUser';
import StateOfButton from './StateOfButton';
import moment from 'moment';
import SingleNotification from './SingleNotification';
function NotificationList({ notifications }) {
  const activeUser = useContext(UserContext);

  return (
    <>
      {notifications.map((notification, index) => {
        return (
          <div
            key={index}
            className='flex flex-row items-center py-3 mt-2 mb-2 bg-white border-t-4 border-indigo-600 rounded-lg shadow-xl rw-full'
          >
            <SingleNotification notification={notification} />
          </div>
        );
      })}
    </>
  );
}

export default React.memo(NotificationList);
