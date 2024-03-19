import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js'

// Add Firebase products that you want to use
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'
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


document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        const uid = user.uid;
        const db = getFirestore();
        const userDocRef = doc(db, "users", uid);
        const treeDocRef = doc(db, "tree", uid);
        const userDoc = await getDoc(userDocRef);
        const treeDoc = await getDoc(treeDocRef);


        if (userDoc.exists()) {
          document.querySelector('.name').innerText = userDoc.data().name;
          document.querySelector('.days').innerText = treeDoc.data().level + "days";

          localStorage.setItem('level', treeDoc.data().level);
          localStorage.setItem('name', userDoc.data().name);

        } else {
          console.log("User document does not exist.");
        }
      } else {
        console.log("No user is signed in.");
      }
    });
  });