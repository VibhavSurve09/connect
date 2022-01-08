import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  GithubAuthProvider,
} from "firebase/auth";
import app from "../../lib/firebase";
export default function AuthenticationModal({ closeButton }) {
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
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-slate-800 bg-opacity-70 sm:bg-opacity-60">
      <div className="bg-white px-16 py-14 rounded-md text-center">
        <button
          onClick={() => {
            closeButton(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 fill-current text-gray-700 cursor-pointer -mt-12 hover:fill-gray-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 className="text-xl mb-4 font-bold text-slate-500">Sign-up using</h1>
        <button
          onClick={googleSignIn}
          className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
        >
          Google
        </button>
        <button
          onClick={gitHubSignIn}
          className="bg-black px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          Github
        </button>
      </div>
    </div>
  );
}
