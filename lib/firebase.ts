import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd5XgiSAj7Os1nwBy-UWg8Z6ZhkAf11G8",
  authDomain: "agro-30117.firebaseapp.com",
  projectId: "agro-30117",
  storageBucket: "agro-30117.firebasestorage.app",
  messagingSenderId: "234443552877",
  appId: "1:234443552877:web:953e1101458bd1a295e764"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db }; 