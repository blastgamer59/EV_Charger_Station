import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAza_FFIXqckdSZnhCGwEzFQe9a7Gn7TVU",
  authDomain: "ev-charger-f3443.firebaseapp.com",
  projectId: "ev-charger-f3443",
  storageBucket: "ev-charger-f3443.firebasestorage.app",
  messagingSenderId: "739587428059",
  appId: "1:739587428059:web:3de5fa5f8d69a945df46fe",
  measurementId: "G-9X7VQ4WRGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
