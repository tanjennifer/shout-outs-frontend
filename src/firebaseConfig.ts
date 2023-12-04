import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyACTLyLpPUSRtdXTOPnojgXIT3RFwBDafw",
  authDomain: "shoutouts-b2f72.firebaseapp.com",
  projectId: "shoutouts-b2f72",
  storageBucket: "shoutouts-b2f72.appspot.com",
  messagingSenderId: "1065973940417",
  appId: "1:1065973940417:web:4a457df6d6e182cc6fd440",
};

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
