import React from 'react';
import { string, node } from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';

const Page = ({ title, text, children }) => (
  <Container>
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

Page.propTypes = {
  title: string.isRequired,
  text: string,
  children: node,
};

export default Page;
