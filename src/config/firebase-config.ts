
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { EnvFirebase } from '@/helpers/constants';


const FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAlIFQKyw8ioalSuvhTQo8kuf6w5RXfmog",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "clinchwealthio.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "clinchwealthio",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "clinchwealthio.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "753460243160",
  appId: process.env.FIREBASE_APP_ID || "1:753460243160:web:d931f998fa20b6afad05ad",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-Z569RC279G",
};

console.log("FirebaseConfig", FirebaseConfig);


// Initialize Firebase
// const FirebaseApp = initializeApp(FirebaseConfig);
const FirebaseApp = !getApps().length ? initializeApp(FirebaseConfig) : getApp();
export const AppFirebaseStorage = getStorage(FirebaseApp);

// export const FirebaseAnalytics = getAnalytics(FirebaseApp);
