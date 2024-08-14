// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { EnvFirebase } from '@/helpers/constants';

// import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const FirebaseConfig = {
  apiKey: EnvFirebase.API_KEY,
  authDomain: EnvFirebase.AUTH_DOMAIN,
  projectId: EnvFirebase.PROJECT_ID,
  storageBucket: EnvFirebase.STORAGE_BUCKET,
  messagingSenderId: EnvFirebase.MESSAGING_SENDER_ID,
  appId: EnvFirebase.APP_ID,
  measurementId: EnvFirebase.MEASUREMENT_ID,
};

// Initialize Firebase
// const FirebaseApp = initializeApp(FirebaseConfig);
const FirebaseApp = !getApps().length ? initializeApp(FirebaseConfig) : getApp();
export const FirebaseStorage = getStorage(FirebaseApp);
// export const FirebaseAnalytics = getAnalytics(FirebaseApp);
