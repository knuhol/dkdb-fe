import React from 'react';
import { Redirect } from 'react-router';

import { ROUTE } from '../../App/routes';

type ErrorBoundaryProps = {};
type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <Redirect to={ROUTE.ERROR_500} />;
    }

    return children;
  }
}

export default ErrorBoundary;
