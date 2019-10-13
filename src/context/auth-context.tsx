import React, { useState, useEffect } from 'react';
import { createCtx } from './createCtx';
import { firebase, firebaseAuth } from '@api/firebase';
import { User, verifyUser } from 'interfaces';
import { getUserInfo } from '../utils/getUserInfo';

type UserState = User | null | 'loading';

export const [useAuthContext, Provider] = createCtx<{
  user: UserState;
  login: () => void;
  loginWithGitHub: () => void;
}>();

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserState>('loading');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user && verifyUser(user)) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, [user]);

  function login() {
    setUser(null);
  }

  function loginWithGitHub() {
    const provider = new firebase.auth.GithubAuthProvider();

    firebaseAuth
      .signInWithPopup(provider)
      .then(({ user: firebaseUser }) => {
        const user = getUserInfo(firebaseUser);
        if (!user) {
          throw new Error('Failed to authenticate with GitHub');
        }

        setUser({
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
        });
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <Provider value={{ user, login, loginWithGitHub }}>{children}</Provider>
    </>
  );
};
