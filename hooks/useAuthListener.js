import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
const auth = getAuth();
export default function useAuthListener() {
  const [user, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser")) //? This should work in client side
  );
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthUser(localStorage.setItem("authUser", JSON.stringify(auth)));
    } else {
      // User is signed out
      localStorage.removeItem("authUser");
      setAuthUser(null);
    }
    return { user };
  });
}
