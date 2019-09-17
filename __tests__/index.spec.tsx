import * as React from 'react';
import { render } from '@testing-library/react';
import App from '../pages/index';
import { links as mockLinks } from '../constants/mockData';

jest.mock('hooks/useLinks', () => ({
  useLinks: jest.fn(() => ({
    links: mockLinks,
  })),
}));

describe('App', () => {
  it('renders the application', () => {
    const { queryByTestId } = render(<App />);

    expect(queryByTestId('application')).toBeTruthy();
  });
});
