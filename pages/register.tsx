import React from 'react';
import Header from 'components/Header';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Content, Form, Separator, FormHeader } from 'pages/login';
import GitHubLogin from 'components/GitHubLogin';

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

const register = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Content data-testid="application">
        <Form>
          <FormHeader>Register</FormHeader>
          <TextField
            required
            id="standard-required"
            label="Username"
            margin="normal"
          />
          <TextField required id="standard-required" label="Email" margin="normal" />
          <TextField
            required
            id="standard-required"
            label="Password"
            margin="normal"
            className={classes.lastTextField}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submitButton}
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
