import React from 'react';
import { renderWithProviders, fireEvent, cleanup } from 'utils/test-utils';
import SearchBar from 'components/SearchBar';

beforeEach(cleanup);

describe('<SearchBar />', () => {
  it('renders', () => {
    const { getByTestId } = renderWithProviders(<SearchBar />);

    expect(getByTestId('search-bar')).toBeTruthy();
  });

  it('update value of input when input added', () => {
    const { getByLabelText } = renderWithProviders(<SearchBar />);

    const input = getByLabelText('search');

    const value = 'nestjs';
    fireEvent.change(input, { target: { value } });
    expect(input.value).toEqual(value);
  });
});
