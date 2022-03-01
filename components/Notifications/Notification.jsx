import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User';
import { useUser } from '../../hooks/useUser';

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
  console.log(notifications);
  return <div>Notification</div>;
}
