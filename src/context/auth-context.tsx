import React, { useState, useEffect } from 'react';
import { createCtx } from './createCtx';
import { firebase, firebaseAuth } from '@api/firebase';
import { User, verifyUser } from 'interfaces';
import { getUserInfo } from '../utils/getUserInfo';
import { useSnackbarContext } from 'context/index';

type UserState = User | null | 'loading';

export const [useAuthContext, Provider] = createCtx<{
  user: UserState;
  login: () => void;
  logout: () => void;
  loginWithGitHub: () => void;
}>();

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserState>('loading');
  const { openSnackbar } = useSnackbarContext();

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

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        openSnackbar({
          message: 'You successfully logged out.',
          variant: 'success',
        });
      })
      .catch(function(error) {
        openSnackbar({
          message: 'An error occured while signing you out',
          variant: 'error',
        });
        console.error(error);
      });
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
      <Provider value={{ user, login, logout, loginWithGitHub }}>
        {children}
      </Provider>
    </>
  );
};
