// @flow
import React, { useEffect } from 'react';
import { Button, Col, Image, Row, Table } from 'react-bootstrap';
import useDimensions from 'react-use-dimensions';

import type { Node } from 'react';
import type { Book } from '../../../hooks/useBooks';

import './style.scss';

const MobileBooksLayout = ({
  books,
  generateTags,
  dateFormatter,
  onPageResize,
}: {
  books: Book[],
  generateTags: (book: Book) => Node,
  dateFormatter: Intl$DateTimeFormat,
  onPageResize: (width: number) => void,
}) => {
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
          <tr key={book.id}>
            <td>{bookIndex + 1}</td>
            <td>
              <Row>
                <Col xs={12}>
                  <h2>
                    {book.title} <small className="text-muted">({book.yearOfIssue})</small>
                  </h2>
                </Col>
                <Col xs={12}>
                  <h3>{book.authors.map(author => `${author.firstName} ${author.lastName}`).join(', ')}</h3>
                </Col>
                <Col xs={12}>
                  <Image src={book.imageURL} thumbnail />
                </Col>
                <Col xs={12} className="tags">
                  {generateTags(book)}
                </Col>
                <Col xs={12}>
                  <Button variant="outline-dark">Více informací</Button>
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

export default MobileBooksLayout;
