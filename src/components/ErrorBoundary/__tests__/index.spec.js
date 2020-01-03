import React from 'react';
import ErrorBoundary from '../index';

import { render } from '@testing-library/react';
import { RedirectionTestingRouter } from '../../../utils/testUtils';

describe('ErrorBoundary', () => {
  it('renders children when no error is presented', () => {
    const redirectUrl = '/error-500';
    const NoErrorComponent = () => <>No error</>;
    const { container } = render(
      <RedirectionTestingRouter
        ComponentWithRedirection={() => (
          <ErrorBoundary>
            <NoErrorComponent />
          </ErrorBoundary>
        )}
        RedirectUrl={redirectUrl}
      />
    );

    expect(container.textContent).toEqual('No error');
  });

  it('redirects to page 500 in case of error', () => {
    const redirectUrl = '/error-500';
    const ErrorComponent = () => {
      throw new Error();
    };
    const { container } = render(
      <RedirectionTestingRouter
        ComponentWithRedirection={() => (
          <ErrorBoundary>
            <ErrorComponent />
          </ErrorBoundary>
        )}
        RedirectUrl={redirectUrl}
      />
    );

    expect(container.textContent).toEqual(redirectUrl);
  });
});
