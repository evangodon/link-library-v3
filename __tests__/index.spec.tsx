import * as React from 'react';
import { render } from '@testing-library/react';
import App from '../pages/index';

describe('App', () => {
  it('renders the application', () => {
    const { queryByTestId } = render(<App />);
    console.log({ queryByTestId });
  });
});
