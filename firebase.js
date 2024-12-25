// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK8ObXO7dEPIb7Ug-fARcJlrX-NlEgfTc",
  authDomain: "mobiluygulamagelistirmeproje.firebaseapp.com",
  projectId: "mobiluygulamagelistirmeproje",
  storageBucket: "mobiluygulamagelistirmeproje.firebasestorage.app",
  messagingSenderId: "9665636846",
  appId: "1:9665636846:web:80fa99c0ce484597ed46ff",
  measurementId: "G-9J5KM2QRCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);