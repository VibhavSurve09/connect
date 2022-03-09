import { useContext } from "react";
import { useUser } from "../hooks/useUser";
import { UserContext } from "../context/User";
import Feed from "../components/Home/Feed";
export default function Home() {
  const user = useContext(UserContext);
  const oldUser = useUser(user?.uid);
  // console.log(oldUser);
  return <Feed />;
}
