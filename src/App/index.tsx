import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import { ROUTE } from './routes';
import withErrorBoundary from '../hoc/withErrorBoundary';
import withTracker from '../hoc/withTracker';
import Home from './Home';
import Books from './Books';
import BookBySlug from './BookBySlug';
import RandomBook from './RandomBook';
import About from './About';
import Error404 from './Error404';
import Error500 from './Error500';

const App = () => (
  <>
    <Switch>
      <Route component={withErrorBoundary(withTracker(Home))} exact path={ROUTE.HOME} />
      <Route component={withErrorBoundary(withTracker(Books))} exact path={ROUTE.BOOKS} />
      <Route component={withErrorBoundary(withTracker(BookBySlug))} exact path={ROUTE.BOOK_BY_SLUG} />
      <Route component={withErrorBoundary(withTracker(RandomBook))} exact path={ROUTE.RANDOM_BOOK} />
      <Route component={withErrorBoundary(withTracker(About))} exact path={ROUTE.ABOUT} />
      <Route component={withTracker(Error404)} exact path={ROUTE.ERROR_404} />
      <Route component={withTracker(Error500)} exact path={ROUTE.ERROR_500} />
      <Route>
        <Redirect to={ROUTE.ERROR_404} />
      </Route>
    </Switch>
  </>
);

export default App;
