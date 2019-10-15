import { User as FirebaseUser } from 'firebase/app';
import { User } from 'interfaces';
import { verifyUser } from '../interfaces/index';

export const getUserInfo = (firebaseUser: FirebaseUser | null): User | null => {
  if (!verifyUser(firebaseUser)) {
    return null;
  }

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
  };
};
