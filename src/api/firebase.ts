import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = process.env.firebaseConfig;

if (!config) {
  throw new Error('Firebase config missing.');
}

const firebaseConfig = !!firebase.apps[0]
  ? firebase.app()
  : firebase.initializeApp(config);

const firestore = firebaseConfig.firestore();
const firebaseAuth = firebase.auth();

export { firebase, firestore, firebaseAuth };
