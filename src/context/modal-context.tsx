import * as React from 'react';
import { createCtx } from './createCtx';

export const [useModalContext, Provider] = createCtx<{
  modalOpen: boolean;
  toggleModal: Function;
  modalContent: React.FC | null;
}>();

/**
 * @todo: Improve toggleModal parameter
 */
export const ModalProvider: React.FC<{ children: React.ReactElement[] }> = ({
  children,
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.FC | null>(null);

  function toggleModal(component: React.FunctionComponent) {
    if (component) {
      setModalContent(component);
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }

  return (
    <>
      <Provider value={{ modalOpen, toggleModal, modalContent }}>
        {children}
      </Provider>
    </>
  );
};
