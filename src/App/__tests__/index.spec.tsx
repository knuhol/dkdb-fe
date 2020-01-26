import React from 'react';
import { fireEvent } from '@testing-library/react';

import App from '..';
import { renderWithRouter } from '../../utils/testUtils';
import { ROUTE } from '../routes';

describe('App', () => {
  it('navigates properly to existing routes', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('DKDB'));
    expect(history.location.pathname).toBe(ROUTE.HOME);

    fireEvent.click(getByText('Knihy'));
    expect(history.location.pathname).toBe(ROUTE.BOOKS);
  });

  it('navigates properly to non existing routes', () => {
    const { history } = renderWithRouter(<App />, { route: '/non/existing/route' });

    expect(history.location.pathname).toBe(ROUTE.ERROR_404);
  });
});
