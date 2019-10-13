import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useModalContext } from 'context/index';
import LinkModal from './modals/LinkModal';

const AddLinkButton: React.FC = () => {
  const { toggleModal } = useModalContext();

  function openLinkModal() {
    toggleModal(() => () => <LinkModal />);
  }

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
