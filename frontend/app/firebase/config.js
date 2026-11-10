// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQqmKf6rSmZLXOWqXS4Ms7D3pg26WUg20",
    authDomain: "nextjs-auth-7651d.firebaseapp.com",
    projectId: "nextjs-auth-7651d",
    storageBucket: "nextjs-auth-7651d.appspot.com",
    messagingSenderId: "130342517183",
    appId: "1:130342517183:web:1a2ac53f0bbdf674b9490a"
  };
  

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

export {app,auth} 