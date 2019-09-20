import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import AddLinkButton from 'components/AddLinkButton';

beforeEach(cleanup);

const mockToggleModal = jest.fn();

jest.mock('context', () => ({
  useModalContext: jest.fn(() => ({ toggleModal: mockToggleModal })),
}));

describe('<AddLinkButton />', () => {
  it('renders the button', () => {
    const { queryByTestId } = render(<AddLinkButton />);
    expect(queryByTestId('add-link-action')).toBeTruthy();
  });

  it('calls the toggleModal function when clicked', () => {
    const { getByTestId } = render(<AddLinkButton />);

    fireEvent.click(getByTestId('add-link-action'));
    expect(mockToggleModal).toHaveBeenCalledTimes(1);
  });
});
