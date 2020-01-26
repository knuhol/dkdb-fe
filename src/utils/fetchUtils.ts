const getTotalBooksUrl = () => {
  return '/api/books/total';
};

const getBookDetailsUrl = ({ slug }: { slug: string }): string => {
  return `/api/books/${slug}`;
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

export type GetBooksParams = {
  orderBy?: keyof typeof ORDER_BY;
  order?: keyof typeof ORDER;
  page?: number;
  size?: number;
};

const getBooksUrl = (params: GetBooksParams = {}): string => {
  const endpoint = '/api/books';
  const query = new URLSearchParams(params as any).toString();

  return `${endpoint}${query ? `?${query}` : ''}`;
};

export { getTotalBooksUrl, getBookDetailsUrl, getBooksUrl, ORDER, ORDER_BY };
