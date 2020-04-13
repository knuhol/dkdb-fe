import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Alert } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import omit from 'lodash/omit';
import find from 'lodash/find';

import Page from '../../components/Page';
import useBooks, { Book } from '../../hooks/useBooks';
import useBooksFilterParams, { BooksFilterParams } from '../../hooks/useBooksFilterParams';
import Filter, { getBookSizeNumberOfPagesText } from './Filter';
import MobileBooksLayout from './mobile';
import DesktopBooksLayout from './desktop';
import EllipsisPagination from '../../components/EllipsisPagination';
import { PARAMS, ROUTE } from '../routes';
import { BooksParams, DEFAULT_BOOK_PARAMS, parseBooksParams, toBooksParams } from '../../utils/urlUtils';
import { trackBooks, BOOKS_ACTION, FILTER_ACTION, trackFilterConfirmation } from '../../utils/analytics';

import './style.scss';

const getTitleAndDescription = (bookParams: BooksParams, booksFilterParams: BooksFilterParams) => {
  let title;
  let extra;

  // orderBy and order
  let orderByText = 'data přidání';
  if (bookParams.orderBy === 'TITLE') {
    orderByText = 'názvu';
  } else if (bookParams.orderBy === 'YEAR_OF_ISSUE') {
    orderByText = 'roku vydání';
  }
  const orderText = bookParams.order === 'ASC' ? 'vzestupně' : 'sestupně';
  title = `Knihy podle ${orderByText}`;

  // bookSize
  if (booksFilterParams?.bookSize && bookParams.bookSize) {
    const bookSize = find(booksFilterParams.bookSize, { slug: bookParams.bookSize });
    if (bookSize) {
      const bookSizeText = getBookSizeNumberOfPagesText(bookSize.minPages, bookSize.maxPages);
      title = `Knihy mající ${bookSizeText}`;
      extra = `majících ${bookSizeText}`;
    }
  }

  // originalLanguage
  if (booksFilterParams?.bookSize && bookParams.originalLanguage) {
    const originalLanguage = find(booksFilterParams.originalLanguage, { slug: bookParams.originalLanguage });
    if (originalLanguage) {
      title = `Knihy v původním jazyce ${originalLanguage.name}`;
      extra = `v původním jazyce ${originalLanguage.name}`;
    }
  }

  // tags
  if (booksFilterParams?.bookSize && bookParams.tags?.length === 1) {
    const tag = find(booksFilterParams.tags, { slug: bookParams.tags[0] });
    if (tag) {
      title = `Knihy s tagem ${tag.name}`;
      extra = `s tagem ${tag.name}`;
    }
  }

  return {
    title,
    description: `Seznam českých LGBT knih${extra ? ` ${extra}` : ''} seřazených ${orderText} podle ${orderByText}.`,
  };
};

const Books = () => {
  const bookParams = parseBooksParams(useLocation().search);
  const page = bookParams.page || DEFAULT_BOOK_PARAMS.page;
  const pageSize = bookParams.pageSize || DEFAULT_BOOK_PARAMS.pageSize;
  const [pageWidth, setPageWidth] = useState(0);
  const books = useBooks(bookParams);
  const booksFilterParams = useBooksFilterParams();
  const history = useHistory();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterDefault, setIsFilterDefault] = useState(true);

  useEffect(() => {
    setIsFilterDefault(Object.keys(omit(bookParams, 'page')).length === 0);
  }, [bookParams]);

  const onPageResize = (newPageWidth: number) => {
    if (newPageWidth > 0) {
      setPageWidth(newPageWidth);
    }
  };
  const onPageClick = (newPage: number) => history.push(toBooksParams({ ...bookParams, page: newPage }));
  const onBookDetailClick = (book: Book, action: BOOKS_ACTION) => () => {
    const { slug, title } = book;

    trackBooks(action, title);
    history.push(ROUTE.BOOK_BY_SLUG.replace(PARAMS.BOOK_DETAIL.SLUG, slug));
  };
  const onOpenFilterClick = () => setIsFilterOpen(!isFilterOpen);
  const onReset = () => {
    trackFilterConfirmation(FILTER_ACTION.RESET_NO_RESULTS);
    history.push(toBooksParams({}));
  };

  if (books?.books == null || books?.total == null || booksFilterParams == null) {
    return <Page loading />;
  }

  const { title, description } = getTitleAndDescription(bookParams, booksFilterParams);

  return (
    <Page id="books" title={title} description={description}>
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
            <Filter setIsFilterOpen={setIsFilterOpen} filterParams={booksFilterParams} />
          </Col>
        </Row>
      )}
      {books.books.length === 0 ? (
        <Row>
          <Col>
            <Alert variant="warning">
              <Row>
                <Col>Pro zadané parametry nebyla nalezena žádná kniha.</Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <Button variant="warning" onClick={onReset}>
                    Zrušit filtr
                  </Button>
                </Col>
              </Row>
            </Alert>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col xs={12}>
              <EllipsisPagination
                total={Math.ceil(books.total / pageSize)}
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
                books={books.books}
                onPageResize={onPageResize}
                onBookDetailClick={onBookDetailClick}
              />
              <DesktopBooksLayout
                active={page}
                pageSize={pageSize}
                books={books.books}
                onPageResize={onPageResize}
                onBookDetailClick={onBookDetailClick}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <EllipsisPagination
                total={Math.ceil(books.total / pageSize)}
                active={page}
                maxWidth={pageWidth}
                onPageClick={onPageClick}
              />
            </Col>
          </Row>
        </>
      )}
    </Page>
  );
};

export default Books;
export { getTitleAndDescription };
