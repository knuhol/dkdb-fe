import React from 'react';
import { useHistory } from 'react-router';

import BookDetail from '../../components/BookDetail';
import useRandomBook from '../../hooks/useRandomBook';

const RandomBook = () => {
  const book = useRandomBook();
  const history = useHistory();

  const nextRandomBook = () => history.go(0);

  return <BookDetail book={book} buttonText="Další náhodná kniha →" onButtonClick={nextRandomBook} />;
};

export default RandomBook;
