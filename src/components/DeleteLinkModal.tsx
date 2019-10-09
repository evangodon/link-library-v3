import React from 'react';
import styled from 'styled-components';
import fetch from 'node-fetch';
import { Link as ILink } from 'interfaces';
import Link from './Link';
import { ModalContainer } from 'components/Modal';
import { useModalContext, useSnackbarContext } from 'context';
import Button from '@material-ui/core/Button';
import ButtonGroup from './ButtonGroup';

type Props = {
  link: ILink;
};

const DeleteLinkModal: React.FC<Props> = ({ link }) => {
  const { toggleModal } = useModalContext();
  const { openSnackbar } = useSnackbarContext();

  function handleCancel() {
    toggleModal();
  }

  function handleDelete() {
    fetch('api/link/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id: link.id }),
    });
    toggleModal();
    openSnackbar({
      variant: 'success',
      message: 'Link Deleted',
    });
  }

  return (
    <ModalContainer data-testid="delete-link-modal">
      <H3>Are you sure you want to delete this link?</H3>
      <Link link={link} displayMode />
      <ButtonContainer>
        <Button variant="contained" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          data-testid="delete-link-action"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </ButtonContainer>
    </ModalContainer>
  );
};

const H3 = styled.h3`
  margin-bottom: 1.2rem;
`;

const ButtonContainer = styled(ButtonGroup)`
  margin-top: 2.4rem;
  margin-left: auto;
  max-width: 30rem;
`;

export default DeleteLinkModal;
