import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { ModalContainer, ModalHeader } from './Modal';

/**
 * @todo: Wire up email/password auth with firebase
 */
const AuthModal = () => {
  const [values] = useState({
    email: '',
    password: '',
  });

  return (
    <ModalContainer>
      <ModalHeader>Log In</ModalHeader>
      <Form>
        <TextField
          id="standard-name"
          label="Email"
          value={values.email}
          margin="normal"
          variant="outlined"
        />
      </Form>
    </ModalContainer>
  );
};

const Form = styled.form``;

export default AuthModal;
