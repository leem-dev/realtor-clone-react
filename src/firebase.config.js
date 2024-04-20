// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUtkeZWEE9ImkaqAZh9nX4Kmptd1Bn7ss",
  authDomain: "realtor-clone-react-35848.firebaseapp.com",
  projectId: "realtor-clone-react-35848",
  storageBucket: "realtor-clone-react-35848.appspot.com",
  messagingSenderId: "298505716549",
  appId: "1:298505716549:web:b83eb0d29172d40aa6f42c",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
