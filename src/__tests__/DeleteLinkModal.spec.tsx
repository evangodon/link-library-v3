import * as React from 'react';
import { renderWithProviders } from 'utils/test-utils';
import DeleteLinkModal from 'components/DeleteLinkModal';

describe('<DeleteLinkModal />', () => {
  it('renders', () => {
    const { queryByTestId } = renderWithProviders(<DeleteLinkModal />);

    expect(queryByTestId('link-modal')).toBeTruthy();
  });
});