// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyvsxe23TGl2m3GVGtoMwdfzytR926j9o",
  authDomain: "web504-as-2.firebaseapp.com",
  databaseURL: "https://web504-as-2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web504-as-2",
  storageBucket: "web504-as-2.appspot.com",
  messagingSenderId: "734196281260",
  appId: "1:734196281260:web:926a67aaba2d9ce7c79409"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

function registerUser() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Registration successful!');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
      });
}

function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Login successful!');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
      });
}

document.getElementById('loginButton').addEventListener('click', loginUser);
document.getElementById('registerButton').addEventListener('click', registerUser);
