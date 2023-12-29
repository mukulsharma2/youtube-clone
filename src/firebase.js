import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD93B82A1NdVCb1IAqYkODheOdjfs4NXVc",
  authDomain: "clone-9d47f.firebaseapp.com",
  projectId: "clone-9d47f",
  storageBucket: "clone-9d47f.appspot.com",
  messagingSenderId: "681599388237",
  appId: "1:681599388237:web:145fc59771b849f2fe6a04",
  measurementId: "G-VN34XP4PVX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
