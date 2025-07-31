// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-mpPl2sSZMBBSN4JGViVOjbqIAG_4SF0",
  authDomain: "mood-983dd.firebaseapp.com",
  projectId: "mood-983dd",
  storageBucket: "mood-983dd.firebasestorage.app",
  messagingSenderId: "227530652578",
  appId: "1:227530652578:web:dbf0fbb5348c8ef11e50fb",
  measurementId: "G-BGD00F6PV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const db = getFirestore(app);

export { db };
