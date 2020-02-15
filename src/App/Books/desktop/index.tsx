import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import useDimensions from 'react-use-dimensions';

import { Book } from '../../../hooks/useBooks';
import { dateFormatter } from '../../../utils/formatterUtils';

import './style.scss';
import Tags from '../../../components/Tags';
import BookCover from '../../../components/BookCover';

type BooksDesktopLayoutProps = {
  books: Book[];
  onPageResize: (newPageWidth: number) => void;
  onBookDetailClick: (slug: string) => () => void;
  active: number;
  pageSize: number;
};

const BooksDesktopLayout = ({ books, onPageResize, onBookDetailClick, active, pageSize }: BooksDesktopLayoutProps) => {
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
          <tr key={book.slug}>
            <td>{bookIndex + 1 + (active - 1) * pageSize}</td>
            <td>
              <BookCover book={book} onClick={onBookDetailClick(book.slug)} className="clickable" />
            </td>
            <td>
              <div className="details">
                <div>
                  <h2>{book.title}</h2>
                </div>
                <Tags book={book} clickable />
                <Button variant="outline-dark" onClick={onBookDetailClick(book.slug)}>
                  Více informací →
                </Button>
              </div>
            </td>
            <td>
              {book.authors.map(author => (
                <span key={`${author.firstName} ${author.lastName}`}>
                  {`${author.firstName} ${author.lastName}`.trim()}
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

export default BooksDesktopLayout;
