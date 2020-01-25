// @flow
import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import invert from 'lodash/invert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import Page from '../../components/Page';
import useBooks from '../../hooks/useBooks';
import useTotalBooks from '../../hooks/useTotalBooks';
import Filter, { DEFAULT_FILTER } from './Filter';
import MobileBooksLayout from './mobile';
import DesktopBooksLayout from './desktop';
import EllipsisPagination from '../../components/EllipsisPagination';
import useQuery from '../../hooks/useQuery';
import { PARAMS, ROUTE, booksWithParams } from '../routes';

import './style.scss';

const Books = () => {
  const DEFAULT = {
    FIRST_PAGE: 1,
    ...DEFAULT_FILTER,
  };

  const getQueryParam = (query, paramName: 'ORDER' | 'ORDER_BY') => {
    const queryParam = query.get(PARAMS.BOOKS[paramName]);
    return invert(PARAMS[paramName])[queryParam || DEFAULT[paramName]];
  };

  // TODO: Isn't just page in URL enough? Wouldn't be better cookie?
  const query = useQuery();
  const pageSize = parseInt(query.get(PARAMS.BOOKS.PAGE_SIZE), 10) || DEFAULT.PAGE_SIZE;
  const activePage = parseInt(query.get(PARAMS.BOOKS.PAGE), 10) || DEFAULT.FIRST_PAGE;
  const order = getQueryParam(query, 'ORDER');
  const orderBy = getQueryParam(query, 'ORDER_BY');
  const [pageWidth, setPageWidth] = useState(0);
  const books = useBooks({ order, orderBy, page: activePage - 1, size: pageSize }, []);
  const totalBooks = useTotalBooks(0);
  const history = useHistory();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterDefault, setIsFilterDefault] = useState(true);

  useEffect(() => {
    setIsFilterDefault(
      (query.get(PARAMS.BOOKS.PAGE_SIZE) == null ||
        query.get(PARAMS.BOOKS.PAGE_SIZE) === DEFAULT.PAGE_SIZE.toString()) &&
        (query.get(PARAMS.BOOKS.ORDER) == null || query.get(PARAMS.BOOKS.ORDER) === DEFAULT.ORDER) &&
        (query.get(PARAMS.BOOKS.ORDER_BY) == null || query.get(PARAMS.BOOKS.ORDER_BY) === DEFAULT.ORDER_BY)
    );
  }, [DEFAULT.ORDER, DEFAULT.ORDER_BY, DEFAULT.PAGE_SIZE, query]);

  const onPageResize = newPageWidth => {
    if (newPageWidth > 0) {
      setPageWidth(newPageWidth);
    }
  };
  const onPageClick = page => () => history.push(booksWithParams({ page, orderBy, order, pageSize }));
  const onBookDetailClick = bookId => () =>
    history.push(ROUTE.BOOK_DETAIL.replace(PARAMS.BOOK_DETAIL.ID, bookId.toString()));
  const onOpenFilterClick = () => setIsFilterOpen(true);

  return (
    <Page id="books" conditions={[books.length > 0]}>
      <Row>
        <Col xs={6}>
          <h1>Knihy</h1>
        </Col>
        <Col xs={6} className="text-right">
          <Button
            className="filter"
            variant={isFilterDefault ? 'outline-primary' : 'outline-danger'}
            onClick={onOpenFilterClick}
          >
            <FontAwesomeIcon icon={faFilter} /> Filtr
          </Button>
        </Col>
      </Row>
      {isFilterOpen && (
        <Row>
          <Col>
            <Filter setIsFilterOpen={setIsFilterOpen} />
          </Col>
        </Row>
      )}
      <Row>
        <Col xs={12}>
          <EllipsisPagination
            total={Math.ceil(totalBooks / pageSize)}
            active={activePage}
            maxWidth={pageWidth}
            onPageClick={onPageClick}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <MobileBooksLayout
            active={activePage}
            pageSize={pageSize}
            books={books}
            onPageResize={onPageResize}
            onBookDetailClick={onBookDetailClick}
          />
          <DesktopBooksLayout
            active={activePage}
            pageSize={pageSize}
            books={books}
            onPageResize={onPageResize}
            onBookDetailClick={onBookDetailClick}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <EllipsisPagination
            total={Math.ceil(totalBooks / pageSize)}
            active={activePage}
            maxWidth={pageWidth}
            onPageClick={onPageClick}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default Books;
