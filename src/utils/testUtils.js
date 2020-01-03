import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import React from 'react';
import { render } from '@testing-library/react';

import { ROUTE } from '../App/routes';

const DEFAULT_ROUTE = ROUTE.HOME;

const renderWithRedirectionRouter = (
  component,
  { route = DEFAULT_ROUTE, history = createMemoryHistory({ initialEntries: [route] }) } = {}
) => {
  const Wrapper = ({ children }) => <Router history={history}>{children}</Router>;
  return {
    ...render(component, { wrapper: Wrapper }),
    history,
  };
};

const renderWithRouter = (
  component,
  { route = DEFAULT_ROUTE, history = createMemoryHistory({ initialEntries: [route] }) } = {}
) => {
  const Wrapper = ({ children }) => <Router history={history}>{children}</Router>;
  return {
    ...render(component, { wrapper: Wrapper }),
    history,
  };
};

export { renderWithRedirectionRouter, renderWithRouter };
