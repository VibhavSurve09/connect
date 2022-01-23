import Image from "next/image";
import styles from "./UserForm.module.css";
import tickImage from "../../public/images/bluetick.png";
import Fireworks from "../Confetti/Confetti";
import Link from "next/link";
export default function Submitted() {
  return (
    <div className="grid justify-items-center items-center h-screen">
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
          Click{" "}
          <button className="text-blue-600">
            <u>
              {" "}
              <i>here</i>
            </u>
          </button>{" "}
          to go to your profile
        </p>
      </div>
    </div>
  );
}
