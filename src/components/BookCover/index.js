// @flow
import React from 'react';
import ReactImage from 'react-image';

import type { Book } from '../../hooks/useBooks';
import defaultBookCover from '../../images/default-book-cover.svg';

const BookCover = ({ book }: { book: Book }) => (
  <ReactImage
    src={[book.imageURL, defaultBookCover]}
    className="cover img-thumbnail"
    alt={`Obálka knihy ${book.title}`}
    decode={false}
  />
);

export default BookCover;
