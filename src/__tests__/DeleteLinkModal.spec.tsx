import * as React from 'react';
import { fireEvent, cleanup, renderWithProviders } from 'utils/test-utils';
import DeleteLinkModal from 'components/modals/DeleteLinkModal';
import { links as mockData } from 'constants/mockData';

beforeEach(cleanup);

const mockCallApi = jest.fn();

jest.mock('node-fetch', () => {
  return jest.fn(() => mockCallApi());
});

const mockToggleModal = jest.fn();
let mockLinks = mockData;
const mockSetLinks = jest.fn((links) => (mockLinks = links));
const mockOpenSnackbar = jest.fn();

jest.mock('context', () => {
  return {
    useModalContext: jest.fn(() => ({ toggleModal: mockToggleModal })),
    useLinksContext: jest.fn(() => ({ links: mockLinks, setLinks: mockSetLinks })),
    useSnackbarContext: jest.fn(() => ({ openSnackbar: mockOpenSnackbar })),
  };
});

describe('<DeleteLinkModal />', () => {
  it('renders', () => {
    const { queryByTestId } = renderWithProviders(
      <DeleteLinkModal link={mockData[0]} />
    );

    expect(queryByTestId('delete-link-modal')).toBeTruthy();
  });

  it('deletes the link given as a prop on confirmation click', () => {
    const { getByTestId } = renderWithProviders(
      <DeleteLinkModal link={mockData[0]} />
    );

    fireEvent.click(getByTestId('delete-link-action'));
    expect(mockCallApi).toHaveBeenCalled();
    expect(mockToggleModal).toHaveBeenCalled();
    expect(mockLinks.length).toBe(mockData.length - 1);
  });
});
