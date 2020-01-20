// @flow

const getTotalBooksUrl = () => {
  return '/api/books/total';
};

const getBookDetailsUrl = ({ id }: { id: number }) => {
  return `/api/books/${id}`;
};

const ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const ORDER_BY = {
  TITLE: 'TITLE',
  DATE_OF_ADDITION: 'DATE_OF_ADDITION',
  YEAR_OF_ISSUE: 'YEAR_OF_ISSUE',
};

interface GetBooksParams {
  orderBy?: $Keys<typeof ORDER_BY>;
  order?: $Keys<typeof ORDER>;
  page?: number;
  size?: number;
}

const getBooksUrl = (params: GetBooksParams = {}) => {
  const endpoint = '/api/books';
  const query = new URLSearchParams(params).toString();

  return `${endpoint}${query ? `?${query}` : ''}`;
};

export { getTotalBooksUrl, getBookDetailsUrl, getBooksUrl, ORDER, ORDER_BY };
export type { GetBooksParams };
