import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADG9YGMSXPpHFh39kM25x9sjVz1QOHYg0",
  authDomain: "multiple-file-chatbot.firebaseapp.com",
  projectId: "multiple-file-chatbot",
  storageBucket: "multiple-file-chatbot.appspot.com",
  messagingSenderId: "592424706291",
  appId: "1:592424706291:web:66fce3557775b5b817d786",
  measurementId: "G-ZFL8BP52EP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
