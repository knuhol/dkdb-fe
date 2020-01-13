// @flow
import React, { useState } from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import Page from '../../components/Page';
import useBooks from '../../hooks/useBooks';
import useTotalBooks from '../../hooks/useTotalBooks';
import MobileBooksLayout from './mobile';
import DesktopBooksLayout from './desktop';
import EllipsisPagination from '../../components/EllipsisPagination';

import './style.scss';

const Books = () => {
  const PAGE_SIZE = 5;

  const [pageWidth, setPageWidth] = useState(0);
  const [active, setActive] = useState(1);
  const books = useBooks({ order: 'ASC', page: active, size: PAGE_SIZE }, []);
  const totalBooks = useTotalBooks(0);

  const dateFormatter = new Intl.DateTimeFormat('cs-CZ');
  const tagColors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

  const onPageResize = newPageWidth => {
    if (newPageWidth > 0) {
      setPageWidth(newPageWidth);
    }
  };
  const generateTags = book =>
    book.tags.map(tag => (
      <Badge key={tag.id} className={tagColors[tag.id % tagColors.length]} variant="primary">
        <FontAwesomeIcon icon={faTag} /> {tag.name}
      </Badge>
    ));
  const onPageClick = pageNumber => () => {
    setActive(pageNumber);
  };

  return (
    <Page id="books" title="Knihy">
      <Row>
        <Col xs={12}>
          <EllipsisPagination
            total={totalBooks / PAGE_SIZE}
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
              books={books}
              dateFormatter={dateFormatter}
              generateTags={generateTags}
              onPageResize={onPageResize}
            />
            <DesktopBooksLayout
              books={books}
              dateFormatter={dateFormatter}
              generateTags={generateTags}
              onPageResize={onPageResize}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col xs={12}>
          <EllipsisPagination
            total={totalBooks / PAGE_SIZE}
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
