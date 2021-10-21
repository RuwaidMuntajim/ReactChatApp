import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyATzTzYed1_3HEPZPUkwhFlpQ1LfR9Cd7k",
    authDomain: "react-chat-app-42c85.firebaseapp.com",
    projectId: "react-chat-app-42c85",
    storageBucket: "react-chat-app-42c85.appspot.com",
    messagingSenderId: "984862259379",
    appId: "1:984862259379:web:64453fcfa025b6e18fd8c6"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
db.settings({timeStampsInSnapshot: true, merge: true});


export {db, auth, firebase}