// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7owjrk31aiD5CY_JK_AWUSMcJU3NDJWs",
  authDomain: "karatoapp.firebaseapp.com",
  projectId: "karatoapp",
  storageBucket: "karatoapp.appspot.com",
  messagingSenderId: "447206705595",
  appId: "1:447206705595:web:5bd3cc4aaf74c1260d9c9e",
  measurementId: "G-FD8ER0LNDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);