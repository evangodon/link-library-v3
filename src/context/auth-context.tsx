import React, { useState } from 'react';
import { createCtx } from './createCtx';
import { firebase, firebaseAuth } from '@api/firebase';
import { User } from 'interfaces';

export const [useAuthContext, Provider] = createCtx<{
  user: User | null;
  login: () => void;
  loginWithGitHub: () => void;
}>();

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  function login() {
    setUser(null);
  }

  function loginWithGitHub() {
    const provider = new firebase.auth.GithubAuthProvider();

    firebaseAuth
      .signInWithPopup(provider)
      .then(({ user }) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        if (!user) {
          throw new Error('Failed to authenticate with GitHub');
        }
        // ...
        setUser({
          email: user.email || '',
          username: user.displayName || '',
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
