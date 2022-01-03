import styles from './Body.module.css';
import Image from 'next/image';
import studentImage from '../../public/images/students-home-picture.png';
export default function Body() {
  return (
    <div className={` h-screen ${styles.body1}`}>
      <div className={styles.leftcontainer}>
        <div className={styles.leftcontent}>
          <Image src={studentImage} alt='Student Picture' />
          {/* <img src='https://img.freepik.com/free-vector/college-students-around-blank-banner_179970-1862.jpg?size=626ext=jpg' /> */}
        </div>
      </div>
      <div className={styles.rightcontainer}>
        <div className={styles.rightcontent}>
            Welcome to your community. Find other students based on your
            preferences and collaborate on projects. Build something innovative.
            
        </div>
      </div>
    </div>
  );
}
