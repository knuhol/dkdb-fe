import React, { useEffect } from 'react';
import ReactGA, { FieldsObject } from 'react-ga';
import { RouteComponentProps } from 'react-router-dom';

const { REACT_APP_GA_TRACKING_ID } = process.env;
const isGaEnabled = REACT_APP_GA_TRACKING_ID != null;

if (REACT_APP_GA_TRACKING_ID) {
  ReactGA.initialize(REACT_APP_GA_TRACKING_ID);
}

const withTracker = <P extends RouteComponentProps>(
  WrappedComponent: React.ComponentType<P>,
  options: FieldsObject = {}
) => {
  const trackPage = (page: string) => {
    ReactGA.set({ page, ...options });
    ReactGA.pageview(page);
  };

  return (props: P) => {
    const { location } = props;

    if (isGaEnabled) {
      useEffect(() => {
        trackPage(location.pathname);
      }, [location.pathname]);
    }

    return <WrappedComponent {...props} />;
  };
};

export default withTracker;
export { isGaEnabled };
