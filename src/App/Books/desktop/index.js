// @flow
import React, { useEffect } from 'react';
import { Button, Image, Table } from 'react-bootstrap';
import useDimensions from 'react-use-dimensions';

import type { Book } from '../../../hooks/useBooks';
import { dateFormatter } from '../../../utils/formatterUtils';

import './style.scss';
import Tags from '../../../components/Tags';

const DesktopBooksLayout = ({
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
    <Table striped bordered hover id="desktop" ref={ref}>
      <thead>
        <tr>
          <th>#</th>
          <th>Obálka</th>
          <th>Název a tagy</th>
          <th>Autoři</th>
          <th>Rok vydání</th>
          <th>Přidáno</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, bookIndex) => (
          <tr key={book.id}>
            <td>{bookIndex + 1 + (active - 1) * pageSize}</td>
            <td>
              <Image src={book.imageURL} alt={`Obálka knihy ${book.title}`} thumbnail />
            </td>
            <td>
              <div className="details">
                <div>
                  <h2>{book.title}</h2>
                </div>
                <Tags book={book} />
                <Button variant="outline-dark" onClick={onBookDetailClick(book.id)}>
                  Více informací →
                </Button>
              </div>
            </td>
            <td>
              {book.authors.map(author => (
                <span key={author.firstName}>
                  {`${author.firstName} ${author.lastName}`}
                  <br />
                </span>
              ))}
            </td>
            <td>{book.yearOfIssue}</td>
            <td>{dateFormatter.format(new Date(book.dateOfAddition))}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DesktopBooksLayout;
