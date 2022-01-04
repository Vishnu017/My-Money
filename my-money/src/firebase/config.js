import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth' 

const firebaseConfig = {
    apiKey: "AIzaSyAZQNipddC4fVw74PzTB_dbkdT1rX3UeTQ",
    authDomain: "mymoney-ec07f.firebaseapp.com",
    projectId: "mymoney-ec07f",
    storageBucket: "mymoney-ec07f.appspot.com",
    messagingSenderId: "521333311768",
    appId: "1:521333311768:web:200f0ee51df2acc3a3f66d"
  };


  //init firebase 
firebase.initializeApp(firebaseConfig);

const projectFireStore = firebase.firestore();
const projectAuth = firebase.auth();

const timestamp = firebase.firestore.Timestamp

export {projectFireStore,projectAuth, timestamp};