import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import { ROUTE } from './routes';
import Menu from './Menu';
import ErrorBoundary from '../components/ErrorBoundary';
import Home from './Home';
import Error404 from './Error404';
import Error500 from './Error500';

const App = () => (
  <Router>
    <Menu />
    <div className="mt-3">
      <Switch>
        <Route exact path={ROUTE.HOME}>
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        </Route>
        <Route exact path={ROUTE.ERROR_404}>
          <Error404 />
        </Route>
        <Route exact path={ROUTE.ERROR_500}>
          <Error500 />
        </Route>
        <Route>
          <Redirect to={ROUTE.ERROR_404} />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
