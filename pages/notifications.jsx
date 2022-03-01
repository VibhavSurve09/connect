import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Notification from '../components/Notifications/Notification';
import { UserContext } from '../context/User';
import { useUser } from '../hooks/useUser';

function Notifications() {
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  const [notifications, setNotifications] = useState();
  useEffect(() => {
    const headers = {
      id: data?.uid,
      emailAddress: data?.email,
    };
    async function fetchNotifications() {
      let _notifications = await axios.get(
        `${process.env.API_URI}/api/notifications/${data.docId}`,
        { headers }
      );
      setNotifications(_notifications);
    }
    if (data) {
      fetchNotifications();
    }
  }, [notifications, data]);
  return (
    <div>
      <Notification />
    </div>
  );
}

export default Notifications;
