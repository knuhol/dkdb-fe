// @flow
import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import Page from '../../components/Page';
import useBooks from '../../hooks/useBooks';
import MobileBooksLayout from './mobile';
import DesktopBooksLayout from './desktop';

import './style.scss';

const Books = () => {
  const books = useBooks({ order: 'ASC', from: 1, to: 50 }, []);
  const dateFormatter = new Intl.DateTimeFormat('cs-CZ');
  const tagColors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
  const generateTags = book =>
    book.tags.map(tag => (
      <span>
        <Badge key={tag.id} className={tagColors[tag.id % tagColors.length]} variant="primary">
          <FontAwesomeIcon icon={faTag} /> {tag.name}
        </Badge>
      </span>
    ));

  return (
    <Page id="books" title="Knihy">
      {books && (
        <Row>
          <Col>
            <MobileBooksLayout books={books} dateFormatter={dateFormatter} generateTags={generateTags} />
            <DesktopBooksLayout books={books} dateFormatter={dateFormatter} generateTags={generateTags} />
          </Col>
        </Row>
      )}
    </Page>
  );
};

export default Books;
