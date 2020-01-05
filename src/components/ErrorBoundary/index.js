import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { ROUTE } from '../../App/routes';

class ErrorBoundary extends Component<{ children: Node }> {
  constructor(props) {
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
