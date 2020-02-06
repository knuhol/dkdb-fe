import React from 'react';
import ReactImage from 'react-image';
import { Image } from 'react-bootstrap';

import { Book } from '../../hooks/useBooks';
import defaultBookCover from '../../images/default-book-cover.svg';

type BookCoverProps = {
  book: Book;
  className?: string;
  onClick?: () => void;
};

const BookCover = ({ book, className, onClick }: BookCoverProps) => {
  const alt = `Obálka knihy ${book.title}`;
  const classNameExtension = className ? ` ${className}` : '';

  return (
    <ReactImage
      src={[book.imageURL, defaultBookCover]}
      className={`img-thumbnail${classNameExtension}`}
      alt={alt}
      decode={false}
      loader={<Image src={defaultBookCover} alt={alt} thumbnail className={classNameExtension} />}
      onClick={onClick}
    />
  );
};

BookCover.defaultProps = {
  className: undefined,
  onClick: undefined,
};

export default BookCover;
