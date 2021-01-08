// src > firebase.js

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBWKAk-DjtWa5vH7WP-0UrBIH_nlt7pAyo",
  authDomain: "find-waldo-1e980.firebaseapp.com",
  projectId: "find-waldo-1e980",
  storageBucket: "find-waldo-1e980.appspot.com",
  messagingSenderId: "1075057876001",
  appId: "1:1075057876001:web:9eff6db6d6a3cd168d9760",
};
// Initialize Firebase

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
