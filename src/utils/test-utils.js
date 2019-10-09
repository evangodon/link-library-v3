import React from 'react';
import { render } from '@testing-library/react';
import { ModalProvider, LinksProvider, SnackbarProvider } from 'context/providers';

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn(() => ({
      query: {
        search: '',
      },
      replace: jest.fn(),
    })),
  };
});

const AllProviders = ({ children }) => {
  return (
    <ModalProvider>
      <SnackbarProvider>
        <LinksProvider ssrLinks={[]}>{children}</LinksProvider>
      </SnackbarProvider>
    </ModalProvider>
  );
};

const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';

export { renderWithProviders };
