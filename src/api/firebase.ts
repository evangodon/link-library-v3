import firebase from 'firebase/app';
import 'firebase/firestore';

const config = process.env.firebaseConfig;

if (!config) {
  throw new Error('Firebase config missing.');
}

console.log({ config });

const firebaseConfig = !!firebase.apps[0]
  ? firebase.app()
  : firebase.initializeApp(config);

const db = firebaseConfig.firestore();

export { db };
