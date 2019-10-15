import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useModalContext, useAuthContext } from 'context/index';
import LinkModal from './modals/LinkModal';

const AddLinkButton: React.FC = () => {
  const { user } = useAuthContext();
  const { toggleModal } = useModalContext();

  function openLinkModal() {
    toggleModal(() => () => <LinkModal />);
  }

  // if (!user) {
  //   return null;
  // }
  console.log({ user });

  return (
    <Button
      variant="contained"
      color="primary"
      data-testid="add-link-action"
      onClick={openLinkModal}
    >
      Add Link
    </Button>
  );
};

export default AddLinkButton;
