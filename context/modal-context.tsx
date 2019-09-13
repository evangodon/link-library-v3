import * as React from 'react';
import { createCtx } from './createCtx';

export const [useModalContext, Provider] = createCtx<{
  modalOpen: boolean;
  toggleModal: Function;
  modalContent: React.ComponentType;
}>();

export const ModalProvider: React.FC<{ children: JSX.Element[] | JSX.Element }> = ({
  children,
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.ComponentType>(
    () => () => <span>hello</span>
  );

  function toggleModal(component: React.ComponentType) {
    if (component) {
      setModalContent(component);
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }

  return (
    <>
      <Provider value={{ modalOpen, toggleModal, modalContent }}>{children}</Provider>
    </>
  );
};
