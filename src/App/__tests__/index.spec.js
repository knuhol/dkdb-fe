import React from 'react';
import { render } from '@testing-library/react';

import App from '..';

describe('App', () => {
  it('renders Hello world', () => {
    const { getByText } = render(<App />);
    const greeting = getByText(/Hello world!/i);

    expect(greeting).toBeInTheDocument();
  });
});
