import './App.css';
import React, {useState, useEffect} from 'react';
import { db, firebaseApp, firebase} from './firebase'

//1 state, effect
//2 texarea
//3 render
//useEffect

function Signin() {  //always rerendered on change of state, App() called

  useEffect(() => {
    //connectToFirebase();
    console.log('after first render!');
    firebase.auth().onAuthStateChanged((user) => {
      const uid = (firebaseApp.auth().currentUser || {}).uid
      if (uid) {
        setUid(uid);
        window.location="/portal";
      } 
    })
  }, []);
  //can be called depending on data in bracket. 



  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [uid, setUid] = useState(null);

  const onEmailChange = (evt) => {
    setEmail(evt.target.value)
  }
  const onPwChange = (evt) => {
    setPw(evt.target.value)
  }
  const submit = () => {
    firebaseApp.auth().createUserWithEmailAndPassword(email, pw)
    .then((user) => {
      console.log(user);
      const uid = (firebaseApp.auth().currentUser || {}).uid
      console.log(uid);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }
  const signIn = () => {
    firebaseApp.auth().signInWithEmailAndPassword(email, pw)
    .then((user) => {
      console.log(user);
      const uid = (firebaseApp.auth().currentUser || {}).uid
      console.log(uid);
      alert('signin!');
      setErr("");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      setErr(errorMessage);
    });
  }

  return (
    <div className="App">
      {err}
      {
        uid ? 
        <>
          {uid}
        </>
        :
        <>
          <textarea 
            onChange={onEmailChange}
            style={{height:200,width:200}} value={email}></textarea>
          <textarea 
            onChange={onPwChange}
            style={{height:200,width:200}} value={pw}></textarea>
          <div onClick={submit}>Submit</div>
          <div onClick={signIn}>Sign In</div>
          <hr/>
        </>
      }
    </div>
  );
}

export default Signin;
