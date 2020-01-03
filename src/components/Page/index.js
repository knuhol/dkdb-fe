import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Page = ({ title, text, children }) => (
  <Container>
    <Row>
      <Col>
        <h1>{title}</h1>
      </Col>
    </Row>
    <Row>
      <Col className="mt-4 mb-4">{text}</Col>
    </Row>
    {children}
  </Container>
);

export default Page;
