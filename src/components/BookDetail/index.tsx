import React from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import Page from '../Page';
import { BookWithDetails } from '../../hooks/useBook';
import Tags from '../Tags';
import { dateFormatter } from '../../utils/formatterUtils';
import BookCover from '../BookCover';

import goodreads from '../../images/goodreads.svg';
import cbdb from '../../images/cbdb.svg';
import databazeKnih from '../../images/databaze-knih.svg';
import { PARAMS, ROUTE } from '../../App/routes';

import './style.scss';

type BookDetailProps = {
  book?: BookWithDetails;
  buttonText: string;
  onButtonClick: () => void;
};

const NEW_LINE_REGEX = /(\r\n|\r|\n)/;

const BookDetail = ({ book, buttonText, onButtonClick }: BookDetailProps) => {
  if (book == null) {
    return <Page loading />;
  }

  return (
    <Page id="book-detail" title={book.title} description={book.description?.split(NEW_LINE_REGEX)[0]}>
      <Helmet>
        <link
          rel="canonical"
          href={`${process.env.PUBLIC_URL}${ROUTE.BOOK_BY_SLUG.replace(PARAMS.BOOK_DETAIL.SLUG, book.slug)}`}
        />
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}${ROUTE.BOOK_BY_SLUG.replace(PARAMS.BOOK_DETAIL.SLUG, book.slug)}`}
        />
        <meta property="og:image" content={book.imageURL} />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:type" content="books.book" />
        <meta property="books:isbn" content={book.isbn} />
      </Helmet>
      <Row>
        <Col>
          <h1>{book.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>{book.authors?.map(author => `${author.firstName} ${author.lastName}`.trim()).join(', ')}</h2>
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
          <div>Původní jazyk: {book.originalLanguage}</div>
          <div>ISBN: {book.isbn}</div>
        </Col>
        <Col xs={12}>
          <Tags book={book} />
        </Col>
        <Col xs={12} className="description">
          <h3>Popis</h3>
          {book.description?.split(NEW_LINE_REGEX).map((text, index) => (
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
