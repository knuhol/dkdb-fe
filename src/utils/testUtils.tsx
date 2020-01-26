import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';

import { ROUTE } from '../App/routes';

const DEFAULT_ROUTE = ROUTE.HOME;
const PREVIOUS_ROUTE = '/prev-route';

const renderWithRedirectionRouter = (
  component: ReactElement,
  { route = DEFAULT_ROUTE, history = createMemoryHistory({ initialEntries: [route] }) }: any = {}
) => {
  const Wrapper = ({ children }: any) => <Router history={history}>{children}</Router>;
  return {
    ...render(component, { wrapper: Wrapper }),
    history,
  };
};

const renderWithRouter = (
  component: ReactElement,
  {
    route = DEFAULT_ROUTE,
    history = createMemoryHistory({ initialEntries: [PREVIOUS_ROUTE, route], initialIndex: 1 }),
  }: any = {}
) => {
  const Wrapper = ({ children }: any) => <Router history={history}>{children}</Router>;
  return {
    ...render(component, { wrapper: Wrapper }),
    history,
  };
};

export { renderWithRedirectionRouter, renderWithRouter, PREVIOUS_ROUTE };
