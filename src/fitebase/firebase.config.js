// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGhXWUPajVTc40VWWtH-F6ISUGSHk7jwg",
  authDomain: "email-password-authentic-cad6d.firebaseapp.com",
  projectId: "email-password-authentic-cad6d",
  storageBucket: "email-password-authentic-cad6d.appspot.com",
  messagingSenderId: "866068441802",
  appId: "1:866068441802:web:bc35275e36d0a158182233"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export default auth;