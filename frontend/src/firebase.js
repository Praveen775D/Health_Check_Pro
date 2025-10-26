// src/firebase.js
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClPmEpZszr9ArWzHzQ9YU0tbmBJtZRp4M",
  authDomain: "healthcheckpro-7392c.firebaseapp.com",
  projectId: "healthcheckpro-7392c",
  storageBucket: "healthcheckpro-7392c.firebasestorage.app",
  messagingSenderId: "473732251671",
  appId: "1:473732251671:web:d5322fc610f76a4e4fdc52",
  measurementId: "G-DQJ86FZ0ZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;