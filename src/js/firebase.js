// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js'

// Add Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'
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
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
let email = "example@gmail.com";
let password ="12345";
window.signup = ()=>{
    email = document.getElementById("emailInput");
    password = document.getElementById("passwordInput");
    console.log("testfunc");
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        // ..
    });
};
