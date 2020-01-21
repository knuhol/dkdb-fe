// @flow
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import every from 'lodash/some';

import Loader from './Loader';
import Footer from './Footer';

const Page = ({
  id,
  title,
  text,
  conditions,
  children,
}: {
  id?: string,
  title: string,
  text?: string,
  conditions?: [boolean],
  children?: React$Node,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (conditions && conditions.length > 0) {
      setLoaded(every(conditions));
    } else {
      setLoaded(true);
    }
  }, [conditions]);

  const notLoadedPage = <Loader />;
  const loadedPage = (
    <>
      <Row>
        <Col>
          <h1>{title}</h1>
        </Col>
      </Row>
      {text && (
        <Row>
          <Col className="mt-2">{text}</Col>
        </Row>
      )}
      {children}
    </>
  );

  return (
    <>
      <main role="main" className="flex-shrink-0 pt-3 pb-2 pt-md-4 pb-md-3">
        <Container id={id}>{loaded ? loadedPage : notLoadedPage}</Container>
      </main>
      <Footer />
    </>
  );
};

Page.defaultProps = {
  id: undefined,
  text: undefined,
  children: undefined,
  conditions: undefined,
};

export default Page;
