import * as React from 'react';
import { renderWithProviders, cleanup } from 'utils/test-utils';
import Links from 'components/Links';
import { links as mockData } from 'constants/mockData';
import { Link as ILink } from 'interfaces';

beforeEach(cleanup);

jest.mock('hooks/useLinks', () => ({
  useLinks: jest.fn((): { links: ILink[] } => ({ links: mockData })),
}));

describe('<Links />', () => {
  it('renders', () => {
    const { getByTestId } = renderWithProviders(<Links />);

    expect(getByTestId('links-container')).toBeTruthy();
  });

  it('renders an array of List components', () => {
    const { getAllByTestId } = renderWithProviders(<Links />);

    expect(getAllByTestId('link').length).toBe(mockData.length);
  });
});
