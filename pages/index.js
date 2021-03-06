import { useContext } from 'react';
import { useUser } from '../hooks/useUser';
import { UserContext } from '../context/User';
import Feed from '../components/Home/Feed';
import Head from 'next/head';

export default function Home() {
  const user = useContext(UserContext);
  const oldUser = useUser(user?.uid);
  // console.log(oldUser);
  return (
    <>
      <Head>
        <title>ConnectU</title>
        <meta
          name='description'
          content='Connect- Developer Collaboration Platform'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Feed />
    </>
  );
}
