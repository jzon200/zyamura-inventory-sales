import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

export default firebaseApp;
export { db, auth, storage };
