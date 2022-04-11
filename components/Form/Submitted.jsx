import styles from "./UserForm.module.css";
import Fireworks from "../Confetti/Confetti";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/User";
import { useUser } from "../../hooks/useUser";
import Link from "next/link";
const handleLogOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
function Submitted() {
  const activeUser = useContext(UserContext);
  const { data, loading } = useUser(activeUser?.uid);
  return (
    <div className="grid items-center h-screen justify-items-center">
      <div>
        <div>
          <Fireworks />
        </div>
        <p
          className={`md:text-2xl sm:text-xl lg:text-4xl text-center align-middle ${styles.subtext}`}
        >
          Your ConnectU account has been succesfully created!
        </p>
        <br />
        <p className="text-center align-middle lg:text-2xl">
          Please{" "}
          <span
            className="text-indigo-400 cursor-pointer"
            onClick={handleLogOut}
          >
            <u>Login</u>
          </span>{" "}
          again to get started.
        </p>
      </div>
    </div>
  );
}

export default React.memo(Submitted);
