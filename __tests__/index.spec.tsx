import * as React from 'react';
import { render } from '@testing-library/react';
import Index from '../pages/index';
import { links as mockLinks } from '../constants/mockData';

jest.mock('hooks/useLinks', () => ({
  useLinks: jest.fn(() => ({
    links: mockLinks,
  })),
}));

describe('<Index />', () => {
  it('renders the application', () => {
    const { queryByTestId } = render(<Index />);

    expect(queryByTestId('application')).toBeTruthy();
  });
});
