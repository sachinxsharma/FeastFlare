import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmqWeQc834wPePZY5sG0vDU5kFZFb-AoE",
  authDomain: "restaurantapp-68885.firebaseapp.com",
  databaseURL: "https://restaurantapp-68885-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-68885",
  storageBucket: "restaurantapp-68885.appspot.com",
  messagingSenderId: "726865005465",
  appId: "1:726865005465:web:515a8bffa8102e5542a108"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };