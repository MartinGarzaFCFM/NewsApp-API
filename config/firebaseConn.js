// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
const firebase = require("firebase/app")
//import { getStorage, ref } from "firebase/storage";
const firebaseStorage = require("firebase/storage")

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOk-DodV5ughv6fB0Q8x2_SbV-QQ7kH-g",
  authDomain: "newsappimages.firebaseapp.com",
  projectId: "newsappimages",
  storageBucket: "newsappimages.appspot.com",
  messagingSenderId: "108368730709",
  appId: "1:108368730709:web:d2147941f31b8ac16a12dc"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = firebaseStorage.getStorage(app);

// Create a storage reference from our storage service
const storageRef = firebaseStorage.ref(storage);

module.exports = storageRef