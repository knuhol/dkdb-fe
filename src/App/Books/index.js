// @flow
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import invert from 'lodash/invert';

import Page from '../../components/Page';
import useBooks from '../../hooks/useBooks';
import useTotalBooks from '../../hooks/useTotalBooks';
import MobileBooksLayout from './mobile';
import DesktopBooksLayout from './desktop';
import EllipsisPagination from '../../components/EllipsisPagination';
import useQuery from '../../hooks/useQuery';
import { PARAMS, ROUTE, booksWithParams } from '../routes';

import './style.scss';

const Books = () => {
  const DEFAULT = {
    PAGE_SIZE: 5,
    ORDER: PARAMS.ORDER.ASC,
    ORDER_BY: PARAMS.ORDER_BY.TITLE,
    FIRST_PAGE: 1,
  };

  const getQueryParam = (query, paramName: 'ORDER' | 'ORDER_BY') => {
    const invertedParam = invert(PARAMS[paramName])[query.get(PARAMS.BOOKS[paramName])];
    return invertedParam || DEFAULT[paramName];
  };

  const pageSize = DEFAULT.PAGE_SIZE;
  const query = useQuery();
  const activePage = parseInt(query.get(PARAMS.BOOKS.PAGE), 10) || DEFAULT.FIRST_PAGE;
  const order = getQueryParam(query, 'ORDER');
  const orderBy = getQueryParam(query, 'ORDER_BY');
  const [pageWidth, setPageWidth] = useState(0);
  const books = useBooks({ order, orderBy, page: activePage - 1, size: pageSize }, []);
  const totalBooks = useTotalBooks(0);
  const history = useHistory();

  const onPageResize = newPageWidth => {
    if (newPageWidth > 0) {
      setPageWidth(newPageWidth);
    }
  };
  const onPageClick = pageNumber => () => history.push(booksWithParams({ page: pageNumber }));
  const onBookDetailClick = bookId => () =>
    history.push(ROUTE.BOOK_DETAIL.replace(PARAMS.BOOK_DETAIL.ID, bookId.toString()));

  return (
    <Page id="books" title="Knihy">
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
      {books && (
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
    </Page>
  );
};

export default Books;
