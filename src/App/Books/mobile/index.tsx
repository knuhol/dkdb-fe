import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import useDimensions from 'react-use-dimensions';

import { Book } from '../../../hooks/useBooks';
import { dateFormatter } from '../../../utils/formatterUtils';
import Tags from '../../../components/Tags';
import BookCover from '../../../components/BookCover';
import { BOOKS_ACTION } from '../../../utils/analytics';

import './style.scss';

type BooksMobileLayoutProps = {
  books: Book[];
  onPageResize: (newPageWidth: number) => void;
  onBookDetailClick: (book: Book, action: BOOKS_ACTION) => () => void;
  active: number;
  pageSize: number;
};

const BooksMobileLayout = ({ books, onPageResize, onBookDetailClick, active, pageSize }: BooksMobileLayoutProps) => {
  const [ref, { width }] = useDimensions();

  useEffect(() => {
    onPageResize(width);
  }, [onPageResize, width]);

  return (
    <Table striped bordered hover id="mobile" ref={ref}>
      <thead>
        <tr>
          <th>#</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, bookIndex) => (
          <tr key={book.slug}>
            <td>{bookIndex + 1 + (active - 1) * pageSize}</td>
            <td>
              <Row>
                <Col xs={12}>
                  <h2>
                    {book.title} <small className="text-muted">({book.yearOfIssue})</small>
                  </h2>
                </Col>
                <Col xs={12}>
                  <h3>{book.authors.map(author => `${author.firstName} ${author.lastName}`.trim()).join(', ')}</h3>
                </Col>
                <Col xs={12}>
                  <BookCover
                    book={book}
                    onClick={onBookDetailClick(book, BOOKS_ACTION.BOOK_DETAIL_COVER)}
                    className="clickable"
                  />
                </Col>
                <Col xs={12}>
                  <Tags book={book} clickable />
                </Col>
                <Col xs={12}>
                  <Button variant="outline-dark" onClick={onBookDetailClick(book, BOOKS_ACTION.BOOK_DETAIL_BUTTON)}>
                    Více informací →
                  </Button>
                </Col>
                <Col xs={12} className="added">
                  Přidáno: {dateFormatter.format(new Date(book.dateOfAddition))}
                </Col>
              </Row>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BooksMobileLayout;
