// Firebaseの設定
const firebaseConfig = {
    apiKey: "AIzaSyA7owjrk31aiD5CY_JK_AWUSMcJU3NDJWs",
    authDomain: "karatoapp.firebaseapp.com",
    projectId: "karatoapp",
    storageBucket: "karatoapp.appspot.com",
    messagingSenderId: "447206705595",
    appId: "1:447206705595:web:5bd3cc4aaf74c1260d9c9e",
    measurementId: "G-FD8ER0LNDR"
};

// 正しいインポート
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getFirestore, collection, query, orderBy, getDocs, limit } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';


const app = initializeApp(firebaseConfig);

const auth = getAuth();
// Firebaseアプリの初期化


// Firestoreインスタンスの取得
const db = getFirestore(app);

window.getDiaryEntries = async(uid) => {
    const q = query(collection(db, "users", uid, "diary"), orderBy("createdAt", "desc"), limit(7));
    const querySnapshot = await getDocs(q);
    const entries = [];
    querySnapshot.forEach((doc) => {
        entries.push({...doc.data(), id: doc.id});
    });
    return entries;
}

onAuthStateChanged(auth, async(user) => {
    const uid = user.uid;
    const entries = await getDiaryEntries(uid);
    const container = document.getElementById("diary-entry"); // HTML内にこのIDを持つ要素があることを想定
    container.innerHTML = ''; // コンテナを空にする
    entries.forEach(entry => {
        const entryElement = document.createElement("div");
        entryElement.classList.add("diary-entry"); // 必要に応じてクラスを追加
        entryElement.innerHTML = `
            <h3>${entry.title}</h3>
            <p>${entry.text}</p>
        `;
        container.appendChild(entryElement);
    });
});





