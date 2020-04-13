import React from 'react';
import { useHistory } from 'react-router';

import BookDetail from '../../components/BookDetail';
import useRandomBook from '../../hooks/useRandomBook';
import { BOOK_ACTION, trackBook } from '../../utils/analytics';

const RandomBook = () => {
  const book = useRandomBook();
  const history = useHistory();

  const nextRandomBook = () => {
    if (book != null) {
      trackBook(BOOK_ACTION.RANDOM, book.title);
    }
    history.go(0);
  };

  return <BookDetail book={book} buttonText="Další náhodná kniha →" onButtonClick={nextRandomBook} />;
};

export default RandomBook;
