import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD-S4W6BwqTsnRmU7v79AYR6m3TKI79gPI",
  authDomain: "DOMAIN",
  databaseURL: "https://native-001-6981c.firebaseio.com",
  projectId: "native-001-6981c",
  storageBucket: "native-001-6981c.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const storage = getStorage(app)

export const firestore = getFirestore(app)

