// @flow
import React from 'react';
import { Button, Image, Table } from 'react-bootstrap';

import type { Node } from 'react';
import type { Book } from '../../../hooks/useBooks';

import './style.scss';

const DesktopBooksLayout = ({
  books,
  generateTags,
  dateFormatter,
}: {
  books: Book[],
  generateTags: (book: Book) => Node,
  dateFormatter: Intl$DateTimeFormat,
}) => (
  <Table striped bordered hover id="desktop">
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
          <td>{bookIndex + 1}</td>
          <td>
            <Image src={book.imageURL} thumbnail />
          </td>
          <td>
            <div className="details">
              <div>
                <h2>{book.title}</h2>
              </div>
              <div className="tags">{generateTags(book)}</div>
              <Button variant="outline-dark">Více informací</Button>
            </div>
          </td>
          <td>
            {book.authors.map(author => (
              <>
                {`${author.firstName} ${author.lastName}`}
                <br />
              </>
            ))}
          </td>
          <td>{book.yearOfIssue}</td>
          <td>{dateFormatter.format(new Date(book.dateOfAddition))}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default DesktopBooksLayout;
