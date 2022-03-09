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
    <div className="fixed bottom-0 left-0 flex items-center justify-center w-full h-full bg-slate-800 bg-opacity-70 sm:bg-opacity-60">
      <div className="px-16 text-center bg-white rounded-md py-14">
        <div className="flex justify-center">
          <button
            onClick={() => {
              closeButton(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 -mt-12 text-gray-700 cursor-pointer fill-current hover:fill-gray-50"
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
        </div>
        <h1 className="mb-4 text-xl font-bold text-slate-500">Sign-up using</h1>
        <button
          onClick={googleSignIn}
          className="px-4 py-2 text-white bg-red-500 rounded-md text-md"
        >
          Google
        </button>
        <button
          onClick={gitHubSignIn}
          className="py-2 ml-2 font-semibold text-white bg-black rounded-md px-7 text-md"
        >
          Github
        </button>
      </div>
    </div>
  );
}
