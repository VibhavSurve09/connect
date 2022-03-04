import axios from 'axios';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User';
import { useUser } from '../../hooks/useUser';
import NotificationList from './NotificationList';

export default function Notifications() {
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  const [notifications, setNotifications] = useState([]);
  const headers = {
    id: data?.uid,
    emailAddress: data?.emailAddress,
  };
  useEffect(() => {
    async function fetchNotifications() {
      let _notifications = await axios.get(
        `${process.env.API_URI}/api/notifications/${data.docId}`,
        { headers }
      );
      setNotifications([
        ...notifications,
        _notifications.data.notifications_data,
      ]);
    }
    if (data) {
      fetchNotifications();
    }
  }, [data]);
  return (
    <div className='w-3/4 min-h-screen lg:w-1/3'>
      <Head>
        <title>Notifications - Connect</title>
      </Head>
      {notifications.length > 0 ? (
        <div className='flex flex-col justify-center'>
          {' '}
          <NotificationList notifications={notifications[0]} />
        </div>
      ) : null}
    </div>
  );
}
