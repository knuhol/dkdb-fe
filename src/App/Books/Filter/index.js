// @flow
import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

import { booksWithParams, PARAMS } from '../../routes';
import useQuery from '../../../hooks/useQuery';

const DEFAULT_FILTER = {
  PAGE_SIZE: 5,
  ORDER: PARAMS.ORDER.DESC,
  ORDER_BY: PARAMS.ORDER_BY.DATE_OF_ADDITION,
};

const Filter = ({ setIsFilterOpen }: { setIsFilterOpen: boolean => void }) => {
  const query = useQuery();
  const [orderBy, setOrderBy] = useState(query.get(PARAMS.BOOKS.ORDER_BY) || DEFAULT_FILTER.ORDER_BY);
  const [order, setOrder] = useState(query.get(PARAMS.BOOKS.ORDER) || DEFAULT_FILTER.ORDER);
  const [pageSize, setPageSize] = useState(query.get(PARAMS.BOOKS.PAGE_SIZE) || DEFAULT_FILTER.PAGE_SIZE);
  const history = useHistory();

  const onOrderByChange = event => setOrderBy(event.target.value);
  const onOrderChange = event => setOrder(event.target.value);
  const onPageSizeChange = event => setPageSize(event.target.value);

  const onSubmit = () => {
    // TODO: Add param only if doesn't match default (move defaults to routes?)
    history.push(booksWithParams({ pageSize, order, orderBy }));
    setIsFilterOpen(false);
  };
  const onCancel = () => setIsFilterOpen(false);

  return (
    <Alert variant="primary">
      <Form>
        <Row>
          <Col xs={12} md={4}>
            <Form.Group controlId="orderBy">
              <Form.Label>Řadit podle</Form.Label>
              <Form.Control as="select" value={orderBy} onChange={onOrderByChange}>
                <option value={PARAMS.ORDER_BY.DATE_OF_ADDITION}>Datum přidání (výchozí)</option>
                <option value={PARAMS.ORDER_BY.TITLE}>Název</option>
                <option value={PARAMS.ORDER_BY.YEAR_OF_ISSUE}>Rok vydání</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="order">
              <Form.Label>Pořadí</Form.Label>
              <Form.Control as="select" value={order} onChange={onOrderChange}>
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
export { DEFAULT_FILTER };
