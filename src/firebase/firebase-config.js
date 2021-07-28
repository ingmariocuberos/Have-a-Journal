import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  const firebaseConfig = {
    apiKey: "AIzaSyBs83t5w1fUf2D8BrnUympYsu1_rYykUNM",
    authDomain: "react-journal-app-130a3.firebaseapp.com",
    projectId: "react-journal-app-130a3",
    storageBucket: "react-journal-app-130a3.appspot.com",
    messagingSenderId: "491678825489",
    appId: "1:491678825489:web:0c851a1d160eca62e885b0"
  };


  firebase.initializeApp(firebaseConfig);

  {/* <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js"></script> */}

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
    db,
    googleAuthProvider,
    firebase
  }