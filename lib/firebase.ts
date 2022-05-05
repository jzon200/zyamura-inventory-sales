import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyB61O8TiGsmjHdTu043hVPqZb1wV8CskYI",
  authDomain: "zyamura-capstone.firebaseapp.com",
  projectId: "zyamura-capstone",
  storageBucket: "zyamura-capstone.appspot.com",
  messagingSenderId: "827347897564",
  appId: "1:827347897564:web:898df7e2e5bf4f46953819",
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

const storage = getStorage(firebaseApp);

// "gs://zyamura-capstone.appspot.com/products/images"

export default firebaseApp;
export { db, auth, storage };
