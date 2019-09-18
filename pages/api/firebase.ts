import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'linklib-bca03.firebaseapp.com',
  databaseURL: 'https://linklib-bca03.firebaseio.com',
  projectId: 'linklib-bca03',
  storageBucket: '',
  messagingSenderId: '1023688338875',
  appId: '1:1023688338875:web:267f028b27f9a8f493e89e',
};

const firebaseConfig = !!firebase.apps[0]
  ? firebase.app()
  : firebase.initializeApp(config);

const db = firebaseConfig.firestore();

export { db };

/** For dev database
    apiKey: "AIzaSyD0wbe8CQAMOcG6HbswSzXfjQsaoldxbS8",
    authDomain: "linklib-dev-630e7.firebaseapp.com",
    databaseURL: "https://linklib-dev-630e7.firebaseio.com",
    projectId: "linklib-dev-630e7",
    storageBucket: "linklib-dev-630e7.appspot.com",
    messagingSenderId: "62798606673",
    appId: "1:62798606673:web:649f5d051d13cdb5cfe370"
 */
