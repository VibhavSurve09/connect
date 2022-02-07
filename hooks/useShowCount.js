import { useEffect, useState } from 'react';
import { socketForChats } from '../server';

export const useShowCount = () => {
  const [allActiveUsersCount, setAllActiveUsersCount] = useState(0);
  useEffect(() => {
    socketForChats.on('active_users_count', ({ count }) => {
      setAllActiveUsersCount(count);
    });
  }, [allActiveUsersCount]);
  return allActiveUsersCount;
};
