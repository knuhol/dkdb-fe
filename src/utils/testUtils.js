import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Route } from 'react-router';
import React from 'react';

const RedirectionTestingRouter = ({ ComponentWithRedirection, RedirectUrl }) => {
  const history = createMemoryHistory();
  return (
    <Router history={history}>
      <Route path="/" exact={true} render={() => <ComponentWithRedirection />} />
      <Route path={RedirectUrl} render={() => <div>{RedirectUrl}</div>} />
    </Router>
  );
};

export { RedirectionTestingRouter };
