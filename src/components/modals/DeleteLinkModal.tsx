import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as ILink } from 'interfaces';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '../Link';
import { ModalContainer } from 'components/modals/Modal';
import { useModalContext, useSnackbarContext } from 'context/index';
import ButtonGroup from 'components/ButtonGroup';
import { request } from '@api/request';

type Props = {
  link: ILink;
};

const DeleteLinkModal: React.FC<Props> = ({ link }) => {
  const { toggleModal } = useModalContext();
  const { openSnackbar } = useSnackbarContext();
  const [loading, setLoading] = useState(false);

  function handleCancel() {
    toggleModal();
  }

  async function handleDelete() {
    setLoading(true);
    const res = await request('api/link/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id: link.id }),
    });
    setLoading(false);
    if (res) {
      openSnackbar({
        variant: 'success',
        message: 'Link Deleted',
      });
    }
    toggleModal();
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
          startIcon={loading && <CircularProgress size={20} />}
          disabled={loading}
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
