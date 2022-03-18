import { getCookie } from 'cookies-next';
import React, { useContext, useEffect } from 'react';
import PostsThatIHaveLiked from '../../../components/Profile/PostsThatIHaveLiked';
import { UserContext } from '../../../context/User';
import { useUser } from '../../../hooks/useUser';

const jwt = require('jsonwebtoken');
export default function LikedPosts({ userName }) {
  const activeUser = useContext(UserContext);
  const { data } = useUser(activeUser?.uid);
  // useEffect(() => {}, [data]);
  return (
    <div className='flex justify-center mt-2 bg-gray-100'>
      {data ? (
        <>
          {' '}
          {userName === data?.userName ? (
            <>
              {' '}
              <PostsThatIHaveLiked username={userName} />
            </>
          ) : (
            <p>Not Allowed</p>
          )}
        </>
      ) : //TODO:Add Spinner Here
      null}
    </div>
  );
}
export async function getServerSideProps(context) {
  const { userName } = context.params;
  return {
    props: {
      userName,
    }, // will be passed to the page component as props
  };
}
