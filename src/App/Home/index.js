import React from 'react';

import { Col, Row } from 'react-bootstrap';
import Page from '../../components/Page';

const Home = () => (
  <Page>
    <Row>
      <Col>
        <h1>Welcome</h1>
      </Col>
    </Row>
    <Row>
      <Col className="mt-2">Bla bla</Col>
    </Row>
  </Page>
);

export default Home;
