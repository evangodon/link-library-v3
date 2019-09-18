import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useModalContext } from 'context';
import AddLinkModal from './AddLinkModal';

const AddLinkButton: React.FC = () => {
  const { toggleModal } = useModalContext();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => toggleModal(() => () => <AddLinkModal />)}
      >
        Add Link
      </Button>
    </>
  );
};

export default AddLinkButton;
