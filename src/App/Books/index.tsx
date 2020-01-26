import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import Page from '../../components/Page';
import useBooks from '../../hooks/useBooks';
import useTotalBooks from '../../hooks/useTotalBooks';
import Filter from './Filter';
import MobileBooksLayout from './mobile';
import DesktopBooksLayout from './desktop';
import EllipsisPagination from '../../components/EllipsisPagination';
import { PARAMS, ROUTE } from '../routes';
import { areBooksParamsDefault, parseBooksParams, toBooksParams } from '../../utils/urlUtils';

import './style.scss';

const Books = () => {
  const { orderBy, order, pageSize, page } = parseBooksParams(useLocation().search);
  const [pageWidth, setPageWidth] = useState(0);
  const books = useBooks({ order, orderBy, page: page - 1, size: pageSize }, []);
  const totalBooks = useTotalBooks(0);
  const history = useHistory();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterDefault, setIsFilterDefault] = useState(true);

  useEffect(() => {
    setIsFilterDefault(areBooksParamsDefault({ orderBy, order, pageSize }));
  }, [order, orderBy, page, pageSize]);

  const onPageResize = (newPageWidth: number) => {
    if (newPageWidth > 0) {
      setPageWidth(newPageWidth);
    }
  };
  const onPageClick = (newPage: number) => () =>
    history.push(toBooksParams({ page: newPage, orderBy, order, pageSize }));
  const onBookDetailClick = (slug: string) => () =>
    history.push(ROUTE.BOOK_DETAIL.replace(PARAMS.BOOK_DETAIL.SLUG, slug));
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
            active={page}
            maxWidth={pageWidth}
            onPageClick={onPageClick}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <MobileBooksLayout
            active={page}
            pageSize={pageSize}
            books={books}
            onPageResize={onPageResize}
            onBookDetailClick={onBookDetailClick}
          />
          <DesktopBooksLayout
            active={page}
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
            active={page}
            maxWidth={pageWidth}
            onPageClick={onPageClick}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default Books;
