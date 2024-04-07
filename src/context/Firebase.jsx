import React, {createContext, useContext} from 'react'

import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import {getDatabase,ref,set} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAJz3kjkefY9PRfUx_qk7Mc9mq8V_SBZxU",
  authDomain: "react-firebase-96a31.firebaseapp.com",
  projectId: "react-firebase-96a31",
  storageBucket: "react-firebase-96a31.appspot.com",
  messagingSenderId: "867674919124",
  appId: "1:867674919124:web:7cd5edba2c59618698eb41",
  databaseURL:"https://react-firebase-96a31-default-rtdb.firebaseio.com/"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth=getAuth(firebaseApp)
const database=getDatabase(firebaseApp)
const googleProvider=new GoogleAuthProvider()

const FirebaseContext=createContext(null)

export const useFirebase=()=>useContext(FirebaseContext)

const signInUserWithEmailAndPassword=async (email,password)=>{
    try {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
        return alert("success");
    } catch (err) {
        return alert(err);
    }
}

const putData=(key,data)=>{set(ref(database,key),data)}

const signUpWithGoogle=()=>{
     return signInWithPopup(firebaseAuth,googleProvider)
}

const Firebase=(props)=>{
    return (
        <FirebaseContext.Provider value={{firebaseAuth,signInUserWithEmailAndPassword,putData,signUpWithGoogle}}>{props.children}</FirebaseContext.Provider>
    )
}

export default Firebase