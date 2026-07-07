import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "psicosaas-3c819.firebaseapp.com",
  projectId: "psicosaas-3c819",
  storageBucket: "psicosaas-3c819.firebasestorage.app",
  messagingSenderId: "400236810873",
  appId: "1:400236810873:web:505802f8306c332bf13aa8",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
