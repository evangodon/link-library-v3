import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

console.log(config);
const firebaseConfig = !!firebase.apps[0]
  ? firebase.app()
  : firebase.initializeApp(config);

const db = firebaseConfig.firestore();

export { db };
