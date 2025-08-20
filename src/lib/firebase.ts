
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "aisolutions-hub-1urup",
  "appId": "1:358572383621:web:078410771b337ca496f8ec",
  "storageBucket": "aisolutions-hub-1urup.firebasestorage.app",
  "apiKey": "AIzaSyCEIH-1bcVpmT3J7WFKQ2l22kjfMCFJLWo",
  "authDomain": "aisolutions-hub-1urup.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "358572383621"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
