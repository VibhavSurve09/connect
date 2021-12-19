import Head from "next/head";
import { FirebaseContext } from "../context/FirebaseContext";
import Layout from "../layout/Layout";
import firebase from "../lib/firebase";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseContext.Provider value={firebase}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FirebaseContext.Provider>
  );
}

export default MyApp;
