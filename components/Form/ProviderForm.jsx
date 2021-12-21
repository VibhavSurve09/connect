import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  GithubAuthProvider,
} from 'firebase/auth';
import app from '../../lib/firebase';
import { doesUserExist } from '../../services/auth';

export default function ProviderForms() {
  const googleAuthProvider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const gitHubAuthProvider = new GithubAuthProvider();
  const googleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (doesUserExist(user.email)) {
          console.log('User Does Not exist');
        } else {
          console.log('User Exits');
        }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const gitHubSignIn = () => {
    signInWithPopup(auth, gitHubAuthProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <button onClick={googleSignIn} className='bg-red-400'>
        Google SignIn
      </button>
      <button onClick={gitHubSignIn} className='bg-slate-400'>
        Github Login
      </button>
    </div>
  );
}
