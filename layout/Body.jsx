import styles from "./Navbar.module.css";
export default function Body(){
    return(
        <body className={`h-screen ${styles.body1}`}>
        <div className={styles.leftcontainer}>
            <div className={styles.leftcontent}>
                 <img src="https://img.freepik.com/free-vector/college-students-around-blank-banner_179970-1862.jpg?size=626ext=jpg"/>
            </div>
        </div>
        <div className={styles.rightcontainer}>
            <div className={styles.rightcontent}>
                <p>Welcome to your own community. Find other students based on your preferences and collaborate on projects. Build something innovative.</p>
            </div>
        </div>
       
        </body>
    );
}