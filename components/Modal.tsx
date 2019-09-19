import React from 'react';
import styled from 'styled-components';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MaterialModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useModalContext } from 'context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const Modal: React.FC = () => {
  const classes = useStyles();
  const { modalOpen, toggleModal, modalContent: ModalContent } = useModalContext();

  const handleClose = () => {
    toggleModal();
  };

  return (
    <>
      <MaterialModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <ModalDiv>
            <ModalContent />
          </ModalDiv>
        </Fade>
      </MaterialModal>
    </>
  );
};

const ModalDiv = styled.div`
  width: 100%;
  max-width: 61rem;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  height: auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

export default Modal;
