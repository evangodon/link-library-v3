import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useModalContext } from 'context';
import LinkModal from './LinkModal';

const AddLinkButton: React.FC = () => {
  const { toggleModal } = useModalContext();

  return (
    <Button
      variant="contained"
      color="primary"
      data-testid="add-link-action"
      onClick={() => toggleModal(() => () => <LinkModal />)}
    >
      Add Link
    </Button>
  );
};

export default AddLinkButton;
