// @flow
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

import Page from '../../components/Page';
import useBooks from '../../hooks/useBooks';
import useTotalBooks from '../../hooks/useTotalBooks';
import MobileBooksLayout from './mobile';
import DesktopBooksLayout from './desktop';
import EllipsisPagination from '../../components/EllipsisPagination';

import './style.scss';
import { PARAMS, ROUTE } from '../routes';

const Books = () => {
  const PAGE_SIZE = 5;

  const [pageWidth, setPageWidth] = useState(0);
  const [active, setActive] = useState(1);
  const books = useBooks({ order: 'ASC', page: active, size: PAGE_SIZE }, []);
  const totalBooks = useTotalBooks(0);
  const history = useHistory();

  const onPageResize = newPageWidth => {
    if (newPageWidth > 0) {
      setPageWidth(newPageWidth);
    }
  };
  const onPageClick = pageNumber => () => {
    setActive(pageNumber);
  };
  const onBookDetailClick = bookId => () => history.push(ROUTE.BOOK_DETAIL.replace(PARAMS.BOOK_DETAIL.ID, bookId));

  return (
    <Page id="books" title="Knihy">
      <Row>
        <Col xs={12}>
          <EllipsisPagination
            total={Math.ceil(totalBooks / PAGE_SIZE)}
            active={active}
            maxWidth={pageWidth}
            onPageClick={onPageClick}
          />
        </Col>
      </Row>
      {books && (
        <Row>
          <Col>
            <MobileBooksLayout
              active={active}
              pageSize={PAGE_SIZE}
              books={books}
              onPageResize={onPageResize}
              onBookDetailClick={onBookDetailClick}
            />
            <DesktopBooksLayout
              active={active}
              pageSize={PAGE_SIZE}
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
            total={Math.ceil(totalBooks / PAGE_SIZE)}
            active={active}
            maxWidth={pageWidth}
            onPageClick={onPageClick}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default Books;
