import Image from "next/image";
import styles from "./UserForm.module.css";
import tickAnimation from "../../public/gif/tick.webp";
export default function Submitted() {
  return (
    <div className={`h-screen -mt-10 ${styles.subb}`}>
      <div className={styles.sub}>
        <figure>
          <Image
            src={tickAnimation}
            width={350}
            height={350}
            alt="Submitted GIF"
          />
          <p className={`sm:text-sm md:text-lg ${styles.sub2}`}>
            Your ConnectU account has been succesfully created!
          </p>
        </figure>
      </div>
    </div>
  );
}
