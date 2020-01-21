// @flow
import React, { useEffect } from 'react';
import { Button, Col, Image, Row, Table } from 'react-bootstrap';
import useDimensions from 'react-use-dimensions';

import type { Book } from '../../../hooks/useBooks';
import { dateFormatter } from '../../../utils/formatterUtils';

import './style.scss';
import Tags from '../../../components/Tags';

const MobileBooksLayout = ({
  books,
  onPageResize,
  onBookDetailClick,
  active,
  pageSize,
}: {
  books: Book[],
  onPageResize: number => void,
  onBookDetailClick: number => () => void,
  active: number,
  pageSize: number,
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
            <td>{bookIndex + 1 + (active - 1) * pageSize}</td>
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
                  <Image src={book.imageURL} alt={`Obálka knihy ${book.title}`} thumbnail />
                </Col>
                <Col xs={12}>
                  <Tags book={book} />
                </Col>
                <Col xs={12}>
                  <Button variant="outline-dark" onClick={onBookDetailClick(book.id)}>
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

export default MobileBooksLayout;
