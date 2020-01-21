// @flow
import React from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

import Page from '../Page';
import errorEmoji from '../../images/error-emoji.svg';
import useQuery from '../../hooks/useQuery';
import { PARAMS } from '../../App/routes';

import './style.scss';

const ErrorPage = ({ title, text }: { title: string, text: string }) => {
  const history = useHistory();
  const query = useQuery();
  const hasBeenRedirected = query.get(PARAMS.REDIRECTION.REDIRECTED) === PARAMS.REDIRECTION.YES;

  const goBack = () => history.go(hasBeenRedirected ? -2 : -1);

  return (
    <Page id="error-page">
      <Row>
        <Col className="text-center mt-4">
          <h1>{title}</h1>
        </Col>
      </Row>
      <Row>
        <Col className="mt-2 text-center">{text}</Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button variant="outline-dark" onClick={goBack}>
            ← Zpátky
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Image src={errorEmoji} alt="Emoji - chyba" />
        </Col>
      </Row>
    </Page>
  );
};

export default ErrorPage;
