import React, { useState } from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import Header from 'components/Header';
import TextField from '@material-ui/core/TextField';
import { AppContainer } from './index';
import GitHubLogin from 'components/GitHubLogin';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useAuthContext, LoginParams, AuthError } from 'context/auth-context';

const useStyles = makeStyles(() =>
  createStyles({
    lastTextField: {
      marginBottom: '4rem',
    },
    submitButton: {
      textTransform: 'none',
    },
  })
);

const login = () => {
  const classes = useStyles();
  const { login } = useAuthContext();
  const [values, setValues] = useState<LoginParams>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<AuthError>(null);

  function handleChange(name: keyof LoginParams) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValues({ ...values, [name]: value });
      setError(null);
    };
  }

  function handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    login(values).catch((error) => setError(error));
  }

  return (
    <>
      <Header />
      <Content data-testid="application">
        <Form>
          <FormHeader>Login</FormHeader>
          {error && <Error>{error.message}</Error>}
          <TextField
            required
            label="Email"
            margin="normal"
            error={Boolean(error && error.code === 'auth/invalid-email')}
            type="email"
            onChange={handleChange('email')}
          />
          <TextField
            required
            label="Password"
            margin="normal"
            type="password"
            className={classes.lastTextField}
            onChange={handleChange('password')}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submitButton}
            type="submit"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Separator>Or</Separator>
          <GitHubLogin />
        </Form>
      </Content>
    </>
  );
};

export const Content = styled(AppContainer)`
  display: flex;
  justify-content: center;
`;

export const FormHeader = styled.h2`
  margin-bottom: 1.6rem;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 35rem;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  padding: 3rem;
  border-radius: var(--border-radius);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,
    rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;

  .MuiInputLabel-asterisk {
    display: none;
  }
`;

export const Error = styled.span`
  padding: 0.2rem 0.4rem;
  border-radius: 2px;
  color: var(--danger-red);
  background-color: ${(props) => lighten(0.3, props.theme.__danger_red)};
`;

export const Separator = styled.span`
  width: 100%;
  text-align: center;
  margin: 2rem 0;
  color: var(--grey-500);
  position: relative;

  &:before,
  &:after {
    content: '';
    border-top: 1px solid var(--grey-300);
    position: absolute;
    top: 50%;
    width: 45%;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
`;

export default login;
