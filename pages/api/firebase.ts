import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBQwfks3T5e1XpQRR9MKMxQ-UUzJo75scU',
  authDomain: 'linklib-bca03.firebaseapp.com',
  databaseURL: 'https://linklib-bca03.firebaseio.com',
  projectId: 'linklib-bca03',
  storageBucket: '',
  messagingSenderId: '1023688338875',
  appId: '1:1023688338875:web:267f028b27f9a8f493e89e',
};

const firebaseConfig =
  firebase.apps.length > 0 ? firebase.app() : firebase.initializeApp(config);

const db = firebaseConfig.firestore();

export { db };
