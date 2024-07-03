import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/userSlice";

import toast from "react-hot-toast";

export let useGoogle = () => {
  const provider = new GoogleAuthProvider();
  //   let { user } = useSelector((state) => state.user);
  let dispetch = useDispatch();
  let handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispetch(login(user));
        toast.success(`Welcome, ${user.displayName}!`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return { handleGoogle };
};
