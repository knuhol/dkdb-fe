// @flow
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import every from 'lodash/some';

import Loader from '../Loader';

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

  if (!loaded) {
    return <Loader />;
  }

  return (
    <Container id={id}>
      <Row>
        <Col>
          <h1>{title}</h1>
        </Col>
      </Row>
      {text && (
        <Row>
          <Col className="mt-4 mb-4">{text}</Col>
        </Row>
      )}
      {children}
    </Container>
  );
};

Page.defaultProps = {
  id: undefined,
  text: undefined,
  children: undefined,
  conditions: undefined,
};

export default Page;
