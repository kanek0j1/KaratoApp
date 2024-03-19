// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js'

import { getStorage } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js';

// Add Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'
import { getFirestore, doc, setDoc, getDoc,  updateDoc } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'
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

// 登録+ホーム遷移
const auth = getAuth();
let email = "example@gmail.com";
let password ="12345";
let name = "michael"
window.signup = ()=>{
    email = document.getElementById("emailInput");
    password = document.getElementById("passwordInput");
    name = document.getElementById("nameInput");
    console.log("testfunc");
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        saveUser(user.uid, name.value).then(() => {
        window.location.href = '../index.html';
        });
    })
    .catch((error) => {
        console.log(error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("登録情報がありません。またはパスワードが間違っています。");
        // ..
    });
};

//ログイン+ホーム遷移
window.login = ()=>{
    email = document.getElementById("emailInput");
    password = document.getElementById("passwordInput");
    console.log(email.value);
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.location.href = '../index.html';
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("登録情報がありません。またはパスワードが間違っています。");
    });
}

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
window.saveUser = (uid,name)=>{
    console.log("saveuserd");
    return setDoc(doc(db, "users", uid), {
        name: name,
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

window.mkdiary = ()=>{
    onAuthStateChanged(auth, async(user) => {
    if (user) {
        const uid = user.uid;
        console.log("mkdiary");
        mktree(uid).then(() => {
            //window.location.href = '../index.html';
        });
        
      } else {
        console.log("No user is signed in.");
      }
    })
}

window.mktree = async(uid)=>{
    const docRef = doc(db, "tree", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let currentLevel = docSnap.data().level;
        if (currentLevel > 0 && currentLevel < 8) {
            await updateDoc(docRef, {
                level: currentLevel + 1
            });
            console.log("Level updated to", currentLevel + 1);
        } else {
            await setDoc(docRef, {
                level: 1
            });
        }
    } else {
        // ドキュメントが存在しない場合、levelを1で新規作成
        await setDoc(docRef, {
            level: 1
        });
        console.log("Document created with level 1");
    }
}



window.saveTree = (uid,level)=>{
    console.log("savetree");
    if(level){

    }
    return setDoc(doc(db, "tree", uid), {
        level: level,
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

const storage = getStorage(app);

