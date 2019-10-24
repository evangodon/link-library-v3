import * as React from 'react';
import styled from 'styled-components';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { Plus } from 'react-feather';
import { useModalContext, useAuthContext } from 'context/index';
import LinkModal from './modals/LinkModal';
import { onlyDisplayOn } from 'css/utils';

const useStyles = makeStyles(() =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
    },
  })
);

const AddLinkButton: React.FC = () => {
  const classes = useStyles();
  const { user } = useAuthContext();
  const { toggleModal } = useModalContext();

  function openLinkModal() {
    toggleModal(() => () => <LinkModal />);
  }

  if (!user || user === 'LOADING') {
    return null;
  }

  return (
    <>
      <Container className={onlyDisplayOn.desktop}>
        <Button
          variant="contained"
          color="primary"
          data-testid="add-link-action"
          onClick={openLinkModal}
        >
          Add Link
        </Button>
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        className={`${classes.fab} ${onlyDisplayOn.mobile}`}
        onClick={openLinkModal}
      >
        <Plus />
      </Fab>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

export default AddLinkButton;
