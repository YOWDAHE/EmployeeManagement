// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from '@firebase/firestore'
import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//     apiKey: "AIzaSyDyvzlJNz3jaRhC61-dQTfBmcpAHEuSsPg",
//     authDomain: "ecommerce-site-651d5.firebaseapp.com",
//     projectId: "ecommerce-site-651d5",
//     storageBucket: "ecommerce-site-651d5.appspot.com",
//     messagingSenderId: "566207411177",
//     appId: "1:566207411177:web:8d9283a36111006a759178",
//     measurementId: "G-68Y4692V6Z"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCzrQnH0rf1huDq4GW_Dng-wL5TZgqpGzo",
    authDomain: "ecommerce-site-54028.firebaseapp.com",
    projectId: "ecommerce-site-54028",
    storageBucket: "ecommerce-site-54028.appspot.com",
    messagingSenderId: "802862786459",
    appId: "1:802862786459:web:843e6a261356e602e8e33e",
    measurementId: "G-GY6CB7M91N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);