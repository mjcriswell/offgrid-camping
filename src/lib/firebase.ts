import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAsQzfNdc3BOz-xG86BNqIHS3V558wg2y4",
  authDomain: "offgrid-camping.firebaseapp.com",
  projectId: "offgrid-camping",
  storageBucket: "offgrid-camping.firebasestorage.app",
  messagingSenderId: "893003807603",
  appId: "1:893003807603:web:5b747f839189ebd6f72306",
  measurementId: "G-PK1RWT8NE1"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
