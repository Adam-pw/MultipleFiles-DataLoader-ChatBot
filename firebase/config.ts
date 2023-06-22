import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBAER_API_KEY,
  authDomain: process.env.FIREBAER_AUTH_DOMAIN,
  projectId: process.env.FIREBAER_PROJECT_ID,
  storageBucket: process.env.FIREBAER_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBAER_MESSAGING_SENDER_ID,
  appId: process.env.FIREBAER_APP_ID,
  measurementId: process.env.FIREBAER_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
