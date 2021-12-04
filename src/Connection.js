import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRQF_dW--y3QkT3IAkVwMF4nGLFFeZJKQ",
  authDomain: "primeiraconexao-b9449.firebaseapp.com",
  projectId: "primeiraconexao-b9449",
  storageBucket: "primeiraconexao-b9449.appspot.com",
  messagingSenderId: "1066879555215",
  appId: "1:1066879555215:web:39dd3dfbb699e9ac9f02fa",
  measurementId: "G-HRKPJN4YZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if(!firebase.apps.length){

    firebase.initializeApp(firebaseConfig);
    //para evitar não abrir duas conexões

}

export default firebase;