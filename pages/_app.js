import { UserContext } from '../context/User';
import useAuthListener from '../hooks/useAuthListener';
import Layout from '../layout/Layout';
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  const user = useAuthListener();
  return (
    <UserContext.Provider value={user}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
