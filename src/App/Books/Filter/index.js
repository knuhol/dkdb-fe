// @flow
import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import invert from 'lodash/invert';

import { PARAMS } from '../../routes';
import { parseBooksParams, toBooksParams } from '../../../utils/urlUtils';

import './style.scss';

const Filter = ({ setIsFilterOpen }: { setIsFilterOpen: boolean => void }) => {
  const params = parseBooksParams(useLocation().search);
  const [orderBy, setOrderBy] = useState(params.orderBy);
  const [order, setOrder] = useState(params.order);
  const [pageSize, setPageSize] = useState(params.pageSize);
  const history = useHistory();

  const onOrderByChange = event => setOrderBy(invert(PARAMS.ORDER_BY)[event.target.value]);
  const onOrderChange = event => setOrder(invert(PARAMS.ORDER)[event.target.value]);
  const onPageSizeChange = event => {
    setPageSize(parseInt(event.target.value, 10));
  };

  const onSubmit = () => {
    history.push(toBooksParams({ orderBy, order, pageSize }));
    setIsFilterOpen(false);
  };
  const onCancel = () => setIsFilterOpen(false);

  return (
    <Alert variant="primary" className="filter">
      <Form>
        <Row>
          <Col xs={12} md={4}>
            <Form.Group controlId="orderBy">
              <Form.Label>Řadit podle</Form.Label>
              <Form.Control as="select" value={PARAMS.ORDER_BY[orderBy]} onChange={onOrderByChange}>
                <option value={PARAMS.ORDER_BY.DATE_OF_ADDITION}>Datum přidání (výchozí)</option>
                <option value={PARAMS.ORDER_BY.TITLE}>Název</option>
                <option value={PARAMS.ORDER_BY.YEAR_OF_ISSUE}>Rok vydání</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="order">
              <Form.Label>Pořadí</Form.Label>
              <Form.Control as="select" value={PARAMS.ORDER[order]} onChange={onOrderChange}>
                <option value={PARAMS.ORDER.DESC}>Sestupně (výchozí)</option>
                <option value={PARAMS.ORDER.ASC}>Vzestupně</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="pageSize">
              <Form.Label>Knih na stranu</Form.Label>
              <Form.Control as="select" value={pageSize} onChange={onPageSizeChange}>
                <option value={5}>5 (výchozí)</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Row>
          <Col xs={6} md={2} xl={1}>
            <Button variant="primary" onClick={onSubmit} block>
              Potvrdit
            </Button>
          </Col>
          <Col xs={6} md={2} xl={1}>
            <Button variant="outline-primary" onClick={onCancel} block>
              Zrušit
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Alert>
  );
};

export default Filter;
