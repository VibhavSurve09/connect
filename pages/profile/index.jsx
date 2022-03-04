import { getUserDataById } from '../../services/firebase';
import Profile from '../../components/Profile/Profile';
import { getCookie } from 'cookies-next';
import { userWithIdSkills } from '../../services/neo4j';
import DisplayOtherProfile from '../../components/Profile/DisplayOtherProfile';
const jwt = require('jsonwebtoken');
const UserProfile = ({ data, self, skills }) => {
  const userData = JSON.parse(data);
  let { seconds, nanoseconds } = userData.accountCreatedOn;
  const date = new Date(seconds * 1000 + nanoseconds / 1000000);
  return (
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
  );
};

export default UserProfile;
export async function getServerSideProps(context) {
  const { req, res } = context;
  const cookie = getCookie('connect_auth_cookie', { req, res });
  let { email, uid } = jwt.decode(cookie, process.env.JWT_SECRET);
  const userData = await getUserDataById(uid);
  const skills = await userWithIdSkills(userData[0]?.uid);

  return {
    props: {
      data: JSON.stringify(userData[0]),
      skills,
    }, // will be passed to the page component as props
  };
}
