import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router';

import App from '..';

describe('App', () => {
  it('navigates properly to existing routes', () => {
    const { getByText, getAllByText } = render(<App />, { wrapper: MemoryRouter });

    fireEvent.click(getByText('DKDB'));
    expect(getByText('Welcome')).toBeInTheDocument();

    fireEvent.click(getByText('Knihy'));
    expect(getAllByText('Knihy').length).toBe(1);
  });

  it('navigates properly to non existing routes', () => {
    const history = createMemoryHistory();
    history.push('/some/bad/route');
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(getByText('Chyba 404')).toBeInTheDocument();
  });
});
