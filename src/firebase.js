import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAbNB-6UfXLKP5MNZJWtDQvfxS1Z0WCwaM",
  authDomain: "kanban-board-b565b.firebaseapp.com",
  projectId: "kanban-board-b565b",
  storageBucket: "kanban-board-b565b.appspot.com",
  messagingSenderId: "139680523481",
  appId: "1:139680523481:web:8130b5b29266db55134ac8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(fbFunctions, "localhost", 5001);
}
