import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Form from "../components/Form/Form";
import Body from "../components/Home/Body";
import { UserContext } from "../context/User";
import { useUser } from "../hooks/useUser";
import Spinner from "../components/Home/Spinner";

function Home() {
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  return (
    <>
      <Head>
        <title>ConnectU</title>
        <meta
          name="description"
          content="Connect- Developer Collaboration Platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {!activeUser ? (
        <>
          <Body />
        </>
      ) : data && loading ? (
        <Spinner />
      ) : (
        <Form />
      )} */}
      {!activeUser ? <Body /> : data ? !loading ? <Spinner /> : null : <Form />}
    </>
  );
}

export default Home;
