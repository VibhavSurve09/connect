import { getUserDataByUserName } from '../../services/firebase';
import Test from '../../components/Profile/Testpage';
import { getCookie } from 'cookies-next';
import { userWithIdSkills } from '../../services/neo4j';
const jwt = require('jsonwebtoken');
const UserProfile = ({ data, self, skills }) => {
  const userData = JSON.parse(data);
  let { seconds, nanoseconds } = userData.accountCreatedOn;
  const date = new Date(seconds * 1000 + nanoseconds / 1000000);
  return (
    <>
      <Test
        userName={userData.userName}
        gender={userData.gender}
        email={userData.emailAddress}
        bio={userData.bio}
        status={userData.status}
        followers={userData.followers.length}
        following={userData.following.length}
        college={userData.collegeName}
        skills={skills}
        self={self}
        imgUrl={userData.photoURL}
        date={date.toDateString()}
        docId={userData.docId}
        uid={userData.uid}
      />
    </>
  );
};

export default UserProfile;
export async function getServerSideProps(context) {
  const { userName } = context.params;
  let self = false;
  const { req, res } = context;
  const userData = await getUserDataByUserName(userName);
  const cookie = getCookie('connect_auth_cookie', { req, res });
  let { email, uid } = jwt.decode(cookie, process.env.JWT_SECRET);
  if (email === userData[0]?.emailAddress && uid === userData[0]?.uid) {
    self = true;
  }
  const skills = await userWithIdSkills(userData[0].uid);
  if (userData.length == 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: JSON.stringify(userData[0]),
      self,
      skills,
    }, // will be passed to the page component as props
  };
}
