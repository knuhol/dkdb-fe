// @flow
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import type { Node } from 'react';

const Page = ({ title, text, children }: { title: string, text?: string, children: Node }) => (
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

Page.defaultProps = {
  text: undefined,
};

export default Page;
