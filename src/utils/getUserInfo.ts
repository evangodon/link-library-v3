import { User as FirebaseUser } from 'firebase/app';
import { User } from 'interfaces';

export const getUserInfo = (firebaseUser: FirebaseUser): User => {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName || '',
    photoURL: firebaseUser.photoURL || '',
  };
};
