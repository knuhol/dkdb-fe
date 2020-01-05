// @flow
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import type { Node } from 'react';

const Page = ({ id, title, text, children }: { id?: string, title: string, text?: string, children: Node }) => (
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

Page.defaultProps = {
  id: undefined,
  text: undefined,
};

export default Page;
