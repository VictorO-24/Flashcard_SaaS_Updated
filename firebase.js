// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApQ1iJ-z8LmEiP4D6xJ2E6dWaTOURW39A",
  authDomain: "flashcardsaas-d260b.firebaseapp.com",
  projectId: "flashcardsaas-d260b",
  storageBucket: "flashcardsaas-d260b.appspot.com",
  messagingSenderId: "836389452903",
  appId: "1:836389452903:web:3499ae8a6f5d88c25ae8c2",
  measurementId: "G-F2Z2ENVM6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
