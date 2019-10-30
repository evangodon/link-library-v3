import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import TextField from '@material-ui/core/TextField';
import { AppContainer } from './index';
import { GitHub } from 'react-feather';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    lastTextField: {
      marginBottom: '3rem',
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
            label="Display Name"
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
          <GitHubButton>
            <GitHub />
            Continue with GitHub
          </GitHubButton>
        </Form>
      </Content>
    </>
  );
};

const Content = styled(AppContainer)`
  display: flex;
  justify-content: center;
`;

const FormHeader = styled.h2`
  margin-bottom: 1.6rem;
`;

const Form = styled.form`
  width: 100%;
  max-width: 35rem;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  padding: 3rem;
  border-radius: var(--border-radius);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,
    rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
`;

const Separator = styled.span`
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

const GitHubButton = styled.button`
  background-color: #333;
  border-color: #000;
  max-width: 30rem;
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);
  padding: 1.2rem;
  position: relative;

  svg {
    width: 1.6rem;
    margin-right: auto;
    position: absolute;
    left: 12px;
    fill: var(--white);
    color: transparent;
  }
`;

export default register;
