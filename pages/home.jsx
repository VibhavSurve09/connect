import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Form from '../components/Form/Form';
import Body from '../components/Home/Body';
import { UserContext } from '../context/User';
import { useUser } from '../hooks/useUser';

function Home() {
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  const router = useRouter();
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
      {!activeUser ? (
        <>
          <Body />
        </>
      ) : data && !loading ? (
        router.push(`/profile/${data.userName}`)
      ) : (
        <Form />
      )}
    </>
  );
}

export default Home;
