import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyCK8ObXO7dEPIb7Ug-fARcJlrX-NlEgfTc",
  authDomain: "mobiluygulamagelistirmeproje.firebaseapp.com",
  projectId: "mobiluygulamagelistirmeproje",
  storageBucket: "mobiluygulamagelistirmeproje.appspot.com", // Hatalı "firebasestorage.app" düzeltildi
  messagingSenderId: "9665636846",
  appId: "1:9665636846:web:80fa99c0ce484597ed46ff",
  measurementId: "G-9J5KM2QRCP",
};

// Firebase başlatma
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
