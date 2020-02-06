import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import invert from 'lodash/invert';
import omitBy from 'lodash/omitBy';
import map from 'lodash/map';

import { Order, OrderBy, PARAMS } from '../../routes';
import { DEFAULT_BOOK_PARAMS, DefaultBookParam, parseBooksParams, toBooksParams } from '../../../utils/urlUtils';
import { BooksFilterParams } from '../../../hooks/useBooksFilterParams';

import './style.scss';

type FilterProps = {
  setIsFilterOpen: (isOpen: boolean) => void;
  filterParams: BooksFilterParams;
};

const DEFAULT_VALUE = 'DEFAULT_VALUE';

const Filter = ({ setIsFilterOpen, filterParams }: FilterProps) => {
  const booksParams = parseBooksParams(useLocation().search);
  const [orderBy, setOrderBy] = useState(booksParams.orderBy);
  const [order, setOrder] = useState(booksParams.order);
  const [pageSize, setPageSize] = useState(booksParams.pageSize);
  const [tags, setTags] = useState<string[] | undefined>(booksParams.tags);
  const [originalLanguage, setOriginalLanguage] = useState(booksParams.originalLanguage);
  const [bookSize, setBookSize] = useState(booksParams.bookSize);
  const history = useHistory();

  const onOrderByChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setOrderBy(invert(PARAMS.ORDER_BY)[event.target.value] as OrderBy);
  const onOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setOrder(invert(PARAMS.ORDER)[event.target.value] as Order);
  const onPageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value, 10));
  };
  const onTagsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTags = map(event.target.selectedOptions, option => option.value);
    setTags(newTags.length === 0 ? undefined : newTags);
  };
  const onOriginalLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOriginalLanguage(event.target.value === DEFAULT_VALUE ? undefined : event.target.value);
  };
  const onBookSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBookSize(event.target.value === DEFAULT_VALUE ? undefined : event.target.value);
  };

  const onSubmit = () => {
    const nonDefaultBooksParams = omitBy(
      { orderBy, order, pageSize, tags, originalLanguage, bookSize },
      (value, key) => DEFAULT_BOOK_PARAMS[key as DefaultBookParam] === value
    );

    history.push(toBooksParams(nonDefaultBooksParams));
    setIsFilterOpen(false);
  };
  const onCancel = () => {
    history.push(toBooksParams({}));
    setIsFilterOpen(false);
  };
  const getBookSizeNumberOfPagesText = (minPages: number | undefined, maxPages: number | undefined) => {
    if (!minPages) {
      return `do ${maxPages} stran`;
    }
    if (!maxPages) {
      return `${minPages} stran a více`;
    }
    return `od ${minPages} do ${maxPages} stran`;
  };

  return (
    <Alert variant="primary" className="filter">
      <Form>
        <Row>
          <Col>
            <h4>Řazení</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <Form.Group controlId="orderBy">
              <Form.Label>Řadit podle</Form.Label>
              <Form.Control
                as="select"
                value={orderBy ? PARAMS.ORDER_BY[orderBy] : PARAMS.ORDER_BY.DATE_OF_ADDITION}
                onChange={onOrderByChange}
              >
                <option value={PARAMS.ORDER_BY.DATE_OF_ADDITION}>Datum přidání (výchozí)</option>
                <option value={PARAMS.ORDER_BY.TITLE}>Název</option>
                <option value={PARAMS.ORDER_BY.YEAR_OF_ISSUE}>Rok vydání</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="order">
              <Form.Label>Pořadí</Form.Label>
              <Form.Control
                as="select"
                value={order ? PARAMS.ORDER[order] : PARAMS.ORDER.DESC}
                onChange={onOrderChange}
              >
                <option value={PARAMS.ORDER.DESC}>Sestupně (výchozí)</option>
                <option value={PARAMS.ORDER.ASC}>Vzestupně</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="pageSize">
              <Form.Label>Knih na stranu</Form.Label>
              <Form.Control as="select" value={(pageSize || 5).toString()} onChange={onPageSizeChange}>
                <option value={5}>5 (výchozí)</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Vyhledávání</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <Form.Group controlId="tags">
              <Form.Label>Tagy</Form.Label>
              <Form.Control as="select" multiple value={tags as any} onChange={onTagsChange}>
                {filterParams.tags.map(option => (
                  <option key={option.slug} value={option.slug}>
                    {option.name} ({option.booksMatchesValue})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="originalLanguage">
              <Form.Label>Původní jazyk</Form.Label>
              <Form.Control as="select" value={originalLanguage} onChange={onOriginalLanguageChange}>
                <option key="all" value={DEFAULT_VALUE}>
                  (všechny)
                </option>
                {filterParams.originalLanguage.map(option => (
                  <option key={option.slug} value={option.slug}>
                    {option.name} ({option.booksMatchesValue})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="bookSize">
              <Form.Label>Délka knihy</Form.Label>
              <Form.Control as="select" value={bookSize} onChange={onBookSizeChange}>
                <option key="all" value={DEFAULT_VALUE}>
                  (všechny)
                </option>
                {filterParams.bookSize.map(option => (
                  <option key={option.slug} value={option.slug}>
                    {option.name}: {getBookSizeNumberOfPagesText(option.minPages, option.maxPages)} (
                    {option.booksMatchesValue})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Row>
          <Col xs={6} md={3} xl={2}>
            <Button variant="primary" onClick={onSubmit} block>
              Potvrdit
            </Button>
          </Col>
          <Col xs={6} md={3} xl={2}>
            <Button variant="outline-primary" onClick={onCancel} block>
              Vše výchozí
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Alert>
  );
};

export default Filter;
