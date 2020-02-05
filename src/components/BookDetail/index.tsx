import React from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';

import Page from '../Page';
import { BookWithDetails } from '../../hooks/useBook';
import Tags from '../Tags';
import { dateFormatter } from '../../utils/formatterUtils';
import BookCover from '../BookCover';

import goodreads from '../../images/goodreads.svg';
import cbdb from '../../images/cbdb.svg';
import databazeKnih from '../../images/databaze-knih.svg';

import './style.scss';

type BookDetailProps = {
  book?: BookWithDetails;
  buttonText: string;
  onButtonClick: () => void;
};

const BookDetail = ({ book, buttonText, onButtonClick }: BookDetailProps) => {
  if (book == null) {
    return <Page loading />;
  }

  return (
    <Page id="book-detail">
      <Row>
        <Col>
          <h1>{book.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>{book.authors?.map(author => `${author.firstName} ${author.lastName}`).join(', ')}</h2>
        </Col>
        <Col className="links">
          <Button variant="light" size="sm" href={book.links?.goodreads || '/#'}>
            <Image src={goodreads} alt="Logo Goodreads" />
            Goodreads
          </Button>
          <Button variant="light" size="sm" href={book.links?.cbdb || '/#'}>
            <Image src={cbdb} alt="Logo ČBDB" />
            ČBDB
          </Button>
          <Button variant="light" size="sm" href={book.links?.databazeKnih || '/#'}>
            <Image src={databazeKnih} alt="Logo Databáze knih" />
            Databáze knih
          </Button>
        </Col>
        <Col xs={12}>
          <BookCover book={book} className="cover" />
        </Col>
        <Col xs={12} className="meta">
          <div>Rok vydání: {book.yearOfIssue}</div>
          <div>Počet stran: {book.numberOfPages}</div>
          <div>Vydavatel: {book.publisher}</div>
          <div>Originální jazyk: {book.originalLanguage}</div>
          <div>ISBN: {book.isbn}</div>
        </Col>
        <Col xs={12}>
          <Tags book={book} />
        </Col>
        <Col xs={12} className="description">
          <h3>Popis</h3>
          {book.description?.split(/(\r\n|\r|\n)/).map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </Col>
        <Col xs={12} className="added">
          Přidáno: {dateFormatter.format(new Date(book.dateOfAddition))}
        </Col>
        <Col className="back">
          <Button variant="outline-dark" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </Col>
      </Row>
    </Page>
  );
};

BookDetail.defaultProps = {
  book: undefined,
};

export default BookDetail;