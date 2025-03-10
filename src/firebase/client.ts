import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCDmbsCXCuilv7HUzP3OZQQEWkzTYAsMTE",
  authDomain: "erlehof---prototype.firebaseapp.com",
  databaseURL: "https://erlehof---prototype-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "erlehof---prototype",
  storageBucket: "erlehof---prototype.firebasestorage.app",
  messagingSenderId: "545271223175",
  appId: "1:545271223175:web:ad19b6f389367989b9f922",
};

export const app = initializeApp(firebaseConfig);