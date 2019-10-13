import * as React from 'react';
import { renderWithProviders } from 'utils/test-utils';
import LinkModal from 'components/modals/LinkModal';

describe('<LinkModal />', () => {
  it('renders', () => {
    const { queryByTestId } = renderWithProviders(<LinkModal />);

    expect(queryByTestId('link-modal')).toBeTruthy();
  });
});
