// @flow
import { buildBaseUrl } from './configUtils';

const getTotalBooksUrl = () => {
  return buildBaseUrl('/books/total');
};

const getBookDetailsUrl = ({ id }: { id: number }) => {
  return buildBaseUrl(`/books/${id}`);
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
  const endpoint = '/books';
  const query = new URLSearchParams(params).toString();

  return buildBaseUrl(`${endpoint}${query ? `?${query}` : ''}`);
};

export { getTotalBooksUrl, getBookDetailsUrl, getBooksUrl };
export type { GetBooksParams };
