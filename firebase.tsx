// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwPE1xTF0Nal8lTuu5XKm509TRD97O9eo",
  authDomain: "digitaltwin-9d208.firebaseapp.com",
  projectId: "digitaltwin-9d208",
  storageBucket: "digitaltwin-9d208.appspot.com",
  messagingSenderId: "298502572521",
  appId: "1:298502572521:web:1b1512203143c083dca378",
  measurementId: "G-FDFRLZ7XMT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// const analytics = getAnalytics(app);
