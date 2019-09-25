import React from 'react';
import { render } from '@testing-library/react';
import { ModalProvider, LinksProvider } from 'context';

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
      <LinksProvider>{children}</LinksProvider>
    </ModalProvider>
  );
};

const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';

export { renderWithProviders };
