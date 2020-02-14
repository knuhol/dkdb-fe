import React from 'react';

import ErrorBoundary from '../components/ErrorBoundary';

const withErrorBoundary = <P extends object>(WrappedComponent: React.ComponentType<P>) => (props: P) => (
  <ErrorBoundary>
    <WrappedComponent {...props} />
  </ErrorBoundary>
);

export default withErrorBoundary;
