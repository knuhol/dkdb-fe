import React from 'react';
import { fireEvent } from '@testing-library/react';

import App from '..';
import { renderWithRouter } from '../../utils/testUtils';
import { ROUTE } from '../routes';

describe('App', () => {
  it('navigates properly to existing routes', () => {
    const { getByText, getAllByAltText, history } = renderWithRouter(<App />);

    fireEvent.click(getAllByAltText('DKDB logo')[0]);
    expect(history.location.pathname).toBe(ROUTE.HOME);

    fireEvent.click(getByText('Knihy'));
    expect(history.location.pathname).toBe(ROUTE.BOOKS);

    fireEvent.click(getByText('Náhodná kniha'));
    expect(history.location.pathname).toBe(ROUTE.RANDOM_BOOK);

    fireEvent.click(getByText('O projektu'));
    expect(history.location.pathname).toBe(ROUTE.ABOUT);
  });

  it('navigates properly to non existing routes', () => {
    const { history } = renderWithRouter(<App />, { route: '/non/existing/route' });

    expect(history.location.pathname).toBe(ROUTE.ERROR_404);
  });
});
