import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { isGaEnabled, trackPageView } from '../utils/analytics';

const withTracker = <P extends RouteComponentProps>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const { location } = props;

    if (isGaEnabled) {
      useEffect(() => {
        trackPageView(location);
      }, [location]);
    }

    return <WrappedComponent {...props} />;
  };
};

export default withTracker;
