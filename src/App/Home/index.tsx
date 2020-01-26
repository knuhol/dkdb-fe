import React from 'react';

import { Col, Row, Image, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router';

import Page from '../../components/Page';
import logo from '../../images/dkdb_full.svg';
import { ROUTE } from '../routes';
import { dateFormatter } from '../../utils/formatterUtils';
import useTotalBooks from '../../hooks/useTotalBooks';

import './style.scss';

const Home = () => {
  const history = useHistory();

  // TODO: Fix to use a real last update date when API supports this
  const totalBooks = useTotalBooks(0);
  const lastUpdate = dateFormatter.format(new Date());

  const onBooksClick = () => history.push(ROUTE.BOOKS);
  const onAboutClick = () => history.push(ROUTE.ABOUT);

  return (
    <Page id="home" conditions={[totalBooks !== 0, lastUpdate !== null]}>
      <Row>
        <Col className="text-center">
          <Alert variant="primary" className="text-center">
            <Row>
              <Col xs={12}>
                Celkem knih: <b>{totalBooks}</b>
              </Col>
              <Col xs={12}>
                Poslední aktualiace: <b>{lastUpdate}</b>
              </Col>
            </Row>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Image src={logo} alt="DKDB logo" />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="text-center">
          <Button variant="outline-primary" onClick={onBooksClick}>
            Prohlížet knihy →
          </Button>
        </Col>
        <Col xs={12} className="text-center">
          <Button variant="outline-primary" onClick={onAboutClick}>
            Informace o projektu →
          </Button>
        </Col>
      </Row>
    </Page>
  );
};

export default Home;
