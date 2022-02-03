import { useContext } from 'react';
import { useUser } from '../hooks/useUser';
import { UserContext } from '../context/User';
export default function Home() {
  const user = useContext(UserContext);
  const oldUser = useUser(user?.uid);
  // console.log(oldUser);
  return <div>Feed</div>;
}
