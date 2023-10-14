import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
// import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyBUAsA-M890c4sbaM_lN6XGBegcZ_mvC1E",
  authDomain: "rolex-c.firebaseapp.com",
  projectId: "rolex-c",
  storageBucket: "rolex-c.appspot.com",
  messagingSenderId: "64121195156",
  appId: "1:64121195156:web:739becae70c577df584281",
  measurementId: "G-EFFZDNDXEX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export default function initFirebase() {
  if (!firebase.apps.length) {
    app;
    if (typeof window !== "undefined") {
      if ("measurementId" in firebaseConfig) {
        getAnalytics(app);
        getPerformance(app);
      }
    }
    console.log("Firebase was successfully initilized");
  }
}
