import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { ROUTE } from '../../App/routes';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Redirect to={ROUTE.ERROR_500} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
