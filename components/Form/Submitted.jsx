import Image from 'next/image';
import styles from './UserForm.module.css';
import tickAnimation from '../../public/gif/tick.webp';
export default function Submitted() {
  return (
    <div className={`h-screen -mt-10 ${styles.subb}`}>
      <div className={styles.sub}>
        <figure>
          <Image
            src={tickAnimation}
            width={350}
            height={350}
            alt='Submitted GIF'
          />
          <p className={`sm:text-sm ${styles.sub2}`}>
            Your account has been succesfully created!
          </p>
        </figure>
        <p className='lg:text-2xl sm:bg-red-700'>Test</p>
      </div>
    </div>
  );
}
