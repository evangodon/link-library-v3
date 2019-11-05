import React, { useState } from 'react';
import Header from 'components/Header';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Content, Form, Separator, FormHeader } from 'pages/login';
import GitHubLogin from 'components/GitHubLogin';
import { useAuthContext, RegisterParams } from 'context/auth-context';

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

/**
 * @todo: Show error messages on submit
 */
const register = () => {
  const classes = useStyles();
  const { register } = useAuthContext();
  const [values, setValues] = useState<RegisterParams>({
    username: '',
    email: '',
    password: '',
  });

  function handleChange(name: keyof RegisterParams) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValues({ ...values, [name]: value });
    };
  }

  function handleRegister(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    register(values);
  }

  return (
    <>
      <Header />
      <Content data-testid="application">
        <Form>
          <FormHeader>Register</FormHeader>
          <TextField
            required
            label="Username"
            value={values.username}
            margin="normal"
            onChange={handleChange('username')}
          />
          <TextField
            required
            label="Email"
            type="email"
            margin="normal"
            value={values.email}
            onChange={handleChange('email')}
          />
          <TextField
            required
            label="Password"
            margin="normal"
            type="password"
            className={classes.lastTextField}
            value={values.password}
            onChange={handleChange('password')}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submitButton}
            type="submit"
            onClick={handleRegister}
          >
            Sign Up
          </Button>
          <Separator>Or</Separator>
          <GitHubLogin />
        </Form>
      </Content>
    </>
  );
};

export default register;
