import { getUserDataByUserName } from "../../services/firebase";
import Test from "../../components/Profile/Testpage";
const UserProfile = ({ data }) => {
  const userData = JSON.parse(data);

  return (
    <>
      <Test
        userName={userData.userName}
        gender={userData.gender}
        email={userData.emailAddress}
        bio={userData.biography}
        status={userData.status}
        followers={userData.followers.length}
        following={userData.following.length}
      />
    </>
  );
};

export default UserProfile;
export async function getServerSideProps(context) {
  const { userName } = context.params;
  const userData = await getUserDataByUserName(userName);
  if (userData.length == 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: JSON.stringify(userData[0]),
    }, // will be passed to the page component as props
  };
}
