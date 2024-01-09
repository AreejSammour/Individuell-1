
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore" ;

const firebaseConfig = {
  apiKey: "AIzaSyAgRm09fXolFqlBlyQKEocVKXHsf8tmlqo",
  authDomain: "javascriptquiz-1c87b.firebaseapp.com",
  projectId: "javascriptquiz-1c87b",
  storageBucket: "javascriptquiz-1c87b.appspot.com",
  messagingSenderId: "42064216317",
  appId: "1:42064216317:web:147d2647d0824834377e94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;