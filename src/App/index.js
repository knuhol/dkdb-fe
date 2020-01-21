// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import { ROUTE } from './routes';
import ErrorBoundary from '../components/ErrorBoundary';
import Home from './Home';
import Books from './Books';
import BookDetail from './BookDetail';
import Error404 from './Error404';
import Error500 from './Error500';

const App = () => (
  <>
    <Switch>
      <Route exact path={ROUTE.HOME}>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </Route>
      <Route exact path={ROUTE.BOOKS}>
        <ErrorBoundary>
          <Books />
        </ErrorBoundary>
      </Route>
      <Route exact path={ROUTE.BOOK_DETAIL}>
        <ErrorBoundary>
          <BookDetail />
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
  </>
);

export default App;
