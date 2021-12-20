import Head from 'next/head';
import { FirebaseContext } from '../context/FirebaseContext';
import { UserContext } from '../context/User';
import useAuthListener from '../hooks/useAuthListener';
import { FieldValue } from 'firebase/firestore';
import Layout from '../layout/Layout';
import firebase from '../lib/firebase';
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  const user = useAuthListener();
  return (
    <FirebaseContext.Provider value={(firebase, FieldValue)}>
      <UserContext.Provider value={user}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </FirebaseContext.Provider>
  );
}

export default MyApp;
