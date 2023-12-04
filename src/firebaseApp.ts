import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { firebaseConfig } from "./firebaseConfig";
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}

export const storage = getStorage(app);
