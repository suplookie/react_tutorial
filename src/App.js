
import './App.css';
import React, {useState, useEffect} from 'react';
import { db, firebaseApp, firebase} from './firebase'

//1 state, effect
//2 texarea
//3 render
//useEffect

function App() {  //always rerendered on change of state, App() called

  useEffect(() => {
    //connectToFirebase();
    console.log('after first render!');
    firebase.auth().onAuthStateChanged((user) => {
      const uid = (firebaseApp.auth().currentUser || {}).uid
      if (uid) {
        setUid(uid)
      } 
    })
  }, []);
  //can be called depending on data in bracket. 


  //console.log("app");
  const [cnt, setCnt] = useState(0); 
  const [text, setText] = useState("dfdf");
  //cnt: what going to render, setCnt: setter

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [uid, setUid] = useState(null);

  useEffect(() => {
    //will be fired when cnt changes
    console.log("use effect -- cnt")
    console.log(cnt);
  }, [cnt]);

  const onClick = () => {
    //setCnt(cnt + 1); 
    setCnt(prev => prev + 1);
  }
  const downClick = () => {
    setCnt(cnt - 1); 
  }
  const readTxtareaValue = () => {
    alert(text)

  }
  const onTextareaCahnge = (evt) => {
    console.log(evt.target.value)
    setText(evt.target.value)
  }
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
  const signOut = () => {
    firebaseApp.auth().signOut().then(() => {
      console.log("firebase logout");
      setUid(null);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }

  return (
    <div className="App">
      <div>HELLO</div>
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
      <div onClick={signOut}>Sign Out</div>
      {cnt}
      <div onClick={onClick}>button</div>
      <div onClick={downClick}>-button</div>
      <div onClick={readTxtareaValue}>readTextareaValue</div>
      <hr/>
      <textarea 
      onChange={onTextareaCahnge}
      style={{height:200,width:200}} value={text}></textarea>
    </div>
  );
}

export default App;
