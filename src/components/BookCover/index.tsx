import React from 'react';
import ReactImage from 'react-image';
import { Image } from 'react-bootstrap';

import { Book } from '../../hooks/useBooks';
import defaultBookCover from '../../images/default-book-cover.svg';

type BookCoverProps = {
  book: Book;
  className?: string;
};

const BookCover = ({ book, className }: BookCoverProps) => {
  const alt = `Obálka knihy ${book.title}`;
  const classNameExtension = className ? ` ${className}` : '';

  return (
    <ReactImage
      src={[book.imageURL, defaultBookCover]}
      className={`img-thumbnail${classNameExtension}`}
      alt={alt}
      decode={false}
      loader={<Image src={defaultBookCover} alt={alt} thumbnail className={classNameExtension} />}
    />
  );
};

BookCover.defaultProps = {
  className: undefined,
};

export default BookCover;
