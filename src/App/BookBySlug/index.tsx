import React from 'react';
import { useHistory, useParams } from 'react-router';

import BookDetail from '../../components/BookDetail';
import useBook from '../../hooks/useBook';

const BookBySlug = () => {
  const { slug } = useParams();
  const book = useBook(slug || 'error');
  const history = useHistory();

  const goBack = () => history.goBack();

  return <BookDetail book={book} buttonText="← Zpátky na přehled" onButtonClick={goBack} />;
};

export default BookBySlug;
