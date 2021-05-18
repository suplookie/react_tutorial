import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDbiWm4aBNBnLiPZChIDSqNSX1scDxPbHI",
    authDomain: "reacttutorial1-20ce0.firebaseapp.com",
    projectId: "reacttutorial1-20ce0",
    storageBucket: "reacttutorial1-20ce0.appspot.com",
    messagingSenderId: "283429662472",
    appId: "1:283429662472:web:5ae003c9d85f6cc30046bd"
  };
/*const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
});*/
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export { db, firebaseApp, firebase};