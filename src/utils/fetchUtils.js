// @flow
const getTotalBooksUrl = () => {
  return '/api/books/total';
};

const getBookDetailsUrl = ({ id }: { id: number }) => {
  return `/api/books/${id}`;
};

type OrderBy = 'AUTHOR' | 'TITLE' | 'DATE_OF_ADDITION' | 'YEAR_OF_ISSUE';
type Order = 'ASC' | 'DESC';

interface GetBooksParams {
  orderBy?: OrderBy;
  order?: Order;
  page?: number;
  size?: number;
}

const getBooksUrl = (params: GetBooksParams = {}) => {
  const endpoint = '/api/books';
  const query = new URLSearchParams(params).toString();

  return `${endpoint}${query ? `?${query}` : ''}`;
};

export { getTotalBooksUrl, getBookDetailsUrl, getBooksUrl };
export type { GetBooksParams };
