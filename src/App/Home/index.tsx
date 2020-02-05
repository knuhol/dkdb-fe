import React from 'react';

import { Col, Row, Image, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router';

import Page from '../../components/Page';
import logo from '../../images/dkdb_full.svg';
import { ROUTE } from '../routes';
import { dateFormatter } from '../../utils/formatterUtils';
import useBooksInfo from '../../hooks/useBooksInfo';

import './style.scss';

const Home = () => {
  const history = useHistory();
  const booksInfo = useBooksInfo();

  const onBooksClick = () => history.push(ROUTE.BOOKS);
  const onAboutClick = () => history.push(ROUTE.ABOUT);

  if (booksInfo == null) {
    return <Page loading />;
  }

  return (
    <Page id="home">
      <Row>
        <Col className="text-center">
          <Alert variant="primary" className="text-center">
            <Row>
              <Col xs={12}>
                Celkem knih: <b>{booksInfo.totalBooks}</b>
              </Col>
              <Col xs={12}>
                Poslední aktualizace: <b>{dateFormatter.format(new Date(booksInfo.dateOfLastBookAddition))}</b>
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
