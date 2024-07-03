import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF2YMUVY9YgEiiLUherWrQ0Ok0u1fc60s",
  authDomain: "dars-4239a.firebaseapp.com",
  projectId: "dars-4239a",
  storageBucket: "dars-4239a.appspot.com",
  messagingSenderId: "16723970830",
  appId: "1:16723970830:web:989788fb4404ea5f31255f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
