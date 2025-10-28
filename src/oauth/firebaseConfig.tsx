// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCS3W7-ShjxyNhf5L7Kc1aS1TEQH5zko-E",
  authDomain: "fanfam-79fe8.firebaseapp.com",
  projectId: "fanfam-79fe8",
  storageBucket: "fanfam-79fe8.firebasestorage.app",
  messagingSenderId: "888108804051",
  appId: "1:888108804051:web:9021996fc5663526c27126",
  measurementId: "G-2XS1KDKCKW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
console.log("✅ Firebase initialized:", app.name);
