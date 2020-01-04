import { buildBaseUrl } from './configUtils';

const ORDER_BY = {
  AUTHOR: 'AUTHOR',
  TITLE: 'TITLE',
  DATE_OF_ADDITION: 'DATE_OF_ADDITION',
  YEAR_OF_ISSUE: 'YEAR_OF_ISSUE',
};

const ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const getTotalBooksUrl = () => {
  return buildBaseUrl('/books/total');
};

const getBookDetailsUrl = ({ id }) => {
  return buildBaseUrl(`/books/${id}`);
};

const getBooksUrl = params => {
  const endpoint = '/books';
  const query = new URLSearchParams(params).toString();

  return buildBaseUrl(`${endpoint}${query ? '?' + query : ''}`);
};

export { ORDER_BY, ORDER, getTotalBooksUrl, getBookDetailsUrl, getBooksUrl };
