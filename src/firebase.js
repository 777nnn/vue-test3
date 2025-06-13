// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "あなたのAPIキー",
  authDomain: "あなたのプロジェクト.firebaseapp.com",
  projectId: "あなたのプロジェクトID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
