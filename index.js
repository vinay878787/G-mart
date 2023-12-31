import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider,signInWithRedirect,onAuthStateChanged, getRedirectResult} from "firebase/auth";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNLUkT_qMuVGMf34WtixKoMVjxdnX2jTo",
    authDomain: "grocery-management-e2953.firebaseapp.com",
    projectId: "grocery-management-e2953",
    storageBucket: "grocery-management-e2953.appspot.com",
    messagingSenderId: "782733882780",
    appId: "1:782733882780:web:bd3b2030090efb53b2c459",
    measurementId: "G-8JXJ2SRS88"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to register a new user
function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Validate email and password (you can add more validation logic)
    if (!email || !password) {
      alert("Please provide both email and password.");
      return;
    }
  
    // Use Firebase Authentication to create a new user
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User registration successful
        const user = userCredential.user;
        console.log('User registered successfully:', user);
        alert('Registration successful!');
      })
      .catch((error) => {
        // Handle errors during user registration
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Registration error:', errorCode, errorMessage);
        alert('Registration failed. Please try again.');
      });
  }


//   login old user
function signInUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Validate email and password (you can add more validation logic)
    if (!email || !password) {
      alert("Please provide both email and password.");
      return;
    }
  
    // Use Firebase Authentication to sign in the user
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User sign-in successful
        const user = userCredential.user;
        console.log('User signed in successfully:', user);
        alert('Sign-in successful!');
      })
      .catch((error) => {
        // Handle errors during user sign-in
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign-in error:', errorCode, errorMessage);
        alert('Sign-in failed. Please check your email and password.');
      });
  }


//   alert if user signs in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(`User with UID ${uid} is signed in.`);
  } else {
    // User is signed out
    console.log("User is signed out.");
  }
});
const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });