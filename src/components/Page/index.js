// @flow
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import every from 'lodash/some';

import Loader from './Loader';
import Menu from './Menu';
import Footer from './Footer';

const Page = ({ id, conditions, children }: { id?: string, conditions?: [boolean], children?: React$Node }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (conditions && conditions.length > 0) {
      setLoaded(every(conditions));
    } else {
      setLoaded(true);
    }
  }, [conditions]);

  return (
    <>
      <header>
        <Menu />
      </header>
      <main role="main" className="flex-shrink-0 pt-3 pb-2 pt-md-4 pb-md-3">
        <Container id={id}>{loaded ? children : <Loader />}</Container>
      </main>
      <Footer />
    </>
  );
};

Page.defaultProps = {
  id: undefined,
  children: undefined,
  conditions: undefined,
};

export default Page;
