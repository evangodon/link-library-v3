import * as React from 'react';
import { renderWithProviders } from 'utils/test-utils';
import Index from 'pages/index';
import { links as mockLinks } from 'constants/mockData';

jest.mock('hooks/useLinks', () => ({
  useLinks: jest.fn(() => ({
    links: mockLinks,
  })),
}));

describe('<Index />', () => {
  it('renders the application', () => {
    const { queryByTestId } = renderWithProviders(<Index links={[]} />);

    expect(queryByTestId('application')).toBeTruthy();
  });
});
