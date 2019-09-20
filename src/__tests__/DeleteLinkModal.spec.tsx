import * as React from 'react';
import { render, fireEvent, cleanup } from 'utils/test-utils';
import DeleteLinkModal from 'components/DeleteLinkModal';
import { links as mockData } from 'constants/mockData';

beforeEach(cleanup);

const mockCallApi = jest.fn();

jest.mock('node-fetch', () => {
  return jest.fn(() => mockCallApi());
});

const mockToggleModal = jest.fn();
let mockLinks = mockData;
const mockSetLinks = jest.fn((links) => (mockLinks = links));

jest.mock('context', () => {
  return {
    useModalContext: jest.fn(() => ({ toggleModal: mockToggleModal })),
    useLinksContext: jest.fn(() => ({ links: mockLinks, setLinks: mockSetLinks })),
  };
});

describe('<DeleteLinkModal />', () => {
  it('renders', () => {
    const { queryByTestId } = render(<DeleteLinkModal link={mockData[0]} />);

    expect(queryByTestId('delete-link-modal')).toBeTruthy();
  });

  it('deletes the link given as a prop on confirmation click', () => {
    const { getByTestId } = render(<DeleteLinkModal link={mockData[0]} />);

    fireEvent.click(getByTestId('delete-link-action'));
    expect(mockCallApi).toHaveBeenCalled();
    expect(mockToggleModal).toHaveBeenCalled();
    expect(mockSetLinks).toHaveBeenCalled();
    expect(mockLinks.length).toBe(mockData.length - 1);
  });
});
