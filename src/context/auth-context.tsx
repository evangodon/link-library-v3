import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { createCtx } from './createCtx';
import { firebase, auth } from '@api/firebase';
import { User, verifyUser } from 'interfaces';
import { getUserInfo } from '../utils/getUserInfo';
import { useSnackbarContext } from 'context/index';
import { cookie } from 'utils/cookies';

type UserState = User | null | 'LOADING';

export type RegisterParams = {
  username: string;
  email: string;
  password: string;
}

export const [useAuthContext, Provider] = createCtx<{
  user: UserState;
  login: () => void;
  logout: () => void;
  register: (registerParams: RegisterParams) => void;
  loginWithGitHub: () => void;
}>();

/**
 *
 * @todo: Finish registration and login
 * @todo: Remove user loading state and just authenticate server side
 */
export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserState>('LOADING');
  const { openSnackbar } = useSnackbarContext();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser && verifyUser(firebaseUser)) {
        const user = getUserInfo(firebaseUser);
        setUser(user);

        firebaseUser.getIdToken(false).then((token) => {
          cookie.set({ name: 'token', value: token });
        });
      } else {
        setUser(null);
        cookie.delete('token');
      }
    });

    return unsubscribe;
  }, []);

  async function register({
    username,
    email,
    password,
  }: RegisterParams) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await auth.currentUser?.updateProfile({
        displayName: username
      })

      Router.push('/');

    } catch (error) {
      console.error(error);
    }
  }

  function login() {
    setUser(null);
  }

  function logout() {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        openSnackbar({
          message: 'You successfully logged out.',
          variant: 'success',
        });
      })
      .catch((error) => {
        openSnackbar({
          message: 'An error occured while signing you out',
          variant: 'error',
        });
        console.error(error);
      });
  }

  function loginWithGitHub() {
    const provider = new firebase.auth.GithubAuthProvider();

    auth
      .signInWithPopup(provider)
      .then(({ user: firebaseUser }) => {
        const user = getUserInfo(firebaseUser);
        if (!user) {
          throw new Error('Failed to authenticate with GitHub');
        }
        Router.push('/');
        setUser(user);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <Provider value={{ user, register, login, logout, loginWithGitHub }}>
        {children}
      </Provider>
    </>
  );
};
