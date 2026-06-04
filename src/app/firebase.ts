import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCV0nNYPLWNGfWp9_KDxmwTEB4911O2oqA",
  authDomain: "will-65b97.firebaseapp.com",
  projectId: "will-65b97",
  storageBucket: "will-65b97.firebasestorage.app",
  messagingSenderId: "872050110455",
  appId: "1:872050110455:web:fc108022e31fb0179808f2",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage(app);