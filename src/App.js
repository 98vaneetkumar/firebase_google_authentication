import { useEffect, useState } from "react";
import "./App.css";
import { useFirebase } from "./context/Firebase";
import {GoogleAuthProvider,onAuthStateChanged} from "firebase/auth"

function App() {
  const firebase = useFirebase();
  let auth=firebase.firebaseAuth
  const [user,setUser]=useState(null)
  const [uid,setUid]=useState("")
  console.log("user",user)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
        // ...
        setUser(user)
      } else {
        // User is signed out
        // ...
      }
    });
  })
  const data=()=>{
    firebase.signUpWithGoogle().then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("token: " + token);
      // The signed-in user info.
      const user = result.user;
      console.log("user: " + user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log("errorCode: " + errorCode)
      const errorMessage = error.message;
      console.log("errorMessage: " + errorMessage)
      // The email of the user's account used.
      const email = error.customData.email;
      console.log("email",email)
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("credential",credential)
    });
  }
  if(user==null){
    return (
      <div className="App">
        <h1>Firebase</h1>
        <button onClick={(e)=>data()}>SignUp with google</button>
      </div>
    );
  }else{
    return (
      <div className="App">
        <h1>Hello {user.email}</h1>
        <h2>{uid}</h2>
        {/* <button onClick={()=>signOut(auth)}>SignOut</button> */}
      </div>
    );
  }

}

export default App;
