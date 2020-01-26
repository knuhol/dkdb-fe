import React from 'react';
import ErrorBoundary from '../index';

import { renderWithRedirectionRouter } from '../../../utils/testUtils';
import { ROUTE } from '../../../App/routes';

describe('ErrorBoundary', () => {
  it('renders children when no error is presented', () => {
    const noError = 'No error';
    const { container } = renderWithRedirectionRouter(<ErrorBoundary>{noError}</ErrorBoundary>);

    expect(container.textContent).toBe(noError);
  });

  it('redirects to page 500 in case of error', () => {
    const ErrorComponent: React.FC = () => {
      throw new Error();
    };
    const { history } = renderWithRedirectionRouter(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(history.location.pathname).toBe(ROUTE.ERROR_500);
  });
});
