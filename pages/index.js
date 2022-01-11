import Head from 'next/head';
import { useContext } from 'react';
import Body from '../components/Home/Body';
import Form from '../components/Form/Form';
import { UserContext } from '../context/User';
export default function Home() {
  const user = useContext(UserContext);
  return (
    <div>
      <Head>
        <title>Connect</title>
        <meta
          name='description'
          content='Connect- Developer Collaboration Platform'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {user ? (
        <>
          {/* <UserForm /> */}
          <Form />
        </>
      ) : (
        <>
          <Body />
        </>
      )}

      {/* Display number of users */}
    </div>
  );
}
