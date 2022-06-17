import { getUserDataByUserName } from '../../../services/firebase';
import Profile from '../../../components/Profile/Profile';
import { getCookie } from 'cookies-next';
import { userWithIdSkills } from '../../../services/neo4j';
import { useEffect, useState } from 'react';
import DisplayOtherProfile from '../../../components/Profile/DisplayOtherProfile';
import { async } from '@firebase/util';
const jwt = require('jsonwebtoken');
const UserProfile = ({ data, self }) => {
  const userData = JSON.parse(data);
  let { seconds, nanoseconds } = userData.accountCreatedOn;
  const date = new Date(seconds * 1000 + nanoseconds / 1000000);
  const [skills, setSkills] = useState([]);
  useEffect(async () => {
    const skills = await userWithIdSkills(userData.uid);
    setSkills(skills);
  }, [userData.uid]);
  return (
    <>
      {self && skills.length > 0 ? (
        <Profile
          userName={userData.userName}
          gender={userData.gender}
          email={userData.emailAddress}
          bio={userData.bio}
          status={userData.status}
          followers={userData.followers.length}
          following={userData.following.length}
          college={userData.collegeName}
          skills={skills}
          imgUrl={userData.photoURL}
          date={date.toDateString()}
          docId={userData.docId}
          uid={userData.uid}
          projects={userData.projectsRef}
        />
      ) : (
        <DisplayOtherProfile
          userName={userData.userName}
          gender={userData.gender}
          email={userData.emailAddress}
          bio={userData.bio}
          status={userData.status}
          followers={userData.followers.length}
          following={userData.following.length}
          college={userData.collegeName}
          skills={skills}
          imgUrl={userData.photoURL}
          date={date.toDateString()}
          docId={userData.docId}
          uid={userData.uid}
          projects={userData.projectsRef}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const { userName } = context.params;
  let self = false;
  const { req, res } = context;
  const userData = await getUserDataByUserName(userName);
  if (userData.length == 0 || !userData) {
    return {
      notFound: true,
    };
  }
  const cookie = getCookie('connect_auth_cookie', { req, res });
  let { email, uid } = jwt.decode(cookie, process.env.JWT_SECRET);
  if (email === userData[0]?.emailAddress && uid === userData[0]?.uid) {
    self = true;
  }

  return {
    props: {
      data: JSON.stringify(userData[0]),
      self,
    }, // will be passed to the page component as props
  };
}

export default UserProfile;
