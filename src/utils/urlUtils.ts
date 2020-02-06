import queryString from 'query-string';
import invert from 'lodash/invert';

import { Order, OrderBy, PARAMS, ROUTE } from '../App/routes';

export type BooksParams = {
  orderBy?: keyof typeof PARAMS.ORDER_BY;
  order?: keyof typeof PARAMS.ORDER;
  page?: number;
  pageSize?: number;
  tags?: string[];
  bookSize?: string;
  originalLanguage?: string;
};

const BOOKS_PARAMS_MAP = {
  orderBy: PARAMS.BOOKS.ORDER_BY,
  order: PARAMS.BOOKS.ORDER,
  page: PARAMS.BOOKS.PAGE,
  pageSize: PARAMS.BOOKS.PAGE_SIZE,
  tags: PARAMS.BOOKS.TAGS,
  bookSize: PARAMS.BOOKS.BOOK_SIZE,
  originalLanguage: PARAMS.BOOKS.ORIGINAL_LANGUAGE,
};
type BookParam = keyof typeof BOOKS_PARAMS_MAP;

const DEFAULT_BOOK_PARAMS: {
  orderBy: OrderBy;
  order: Order;
  page: number;
  pageSize: number;
  tags: string[];
  originalLanguage: undefined;
  bookSize: undefined;
} = {
  orderBy: 'DATE_OF_ADDITION',
  order: 'DESC',
  page: 1,
  pageSize: 5,
  tags: [],
  originalLanguage: undefined,
  bookSize: undefined,
};
export type DefaultBookParam = keyof typeof DEFAULT_BOOK_PARAMS;

const getParamValue = (param: BookParam, params: BooksParams) => {
  let value = params[param];

  if (param === 'orderBy' && params[param]) {
    value = PARAMS.ORDER_BY[params[param] as OrderBy];
  }

  if (param === 'order' && params[param]) {
    value = PARAMS.ORDER[params[param] as Order];
  }

  return value;
};

const parseBooksParams = (query: string) => {
  const params: any = {};
  const invertedMap = invert(BOOKS_PARAMS_MAP);
  const invertedOrderBy = invert(PARAMS.ORDER_BY);
  const invertedOrder = invert(PARAMS.ORDER);
  const parsedQuery = queryString.parse(query, { parseNumbers: true });
  Object.keys(parsedQuery).forEach(localizedParam => {
    if (BOOKS_PARAMS_MAP[invertedMap[localizedParam] as BookParam]) {
      params[invertedMap[localizedParam]] = parsedQuery[localizedParam];
    }
  });

  if (params.orderBy && invertedOrderBy[params.orderBy]) {
    params.orderBy = invertedOrderBy[params.orderBy];
  }

  if (params.order && invertedOrder[params.order]) {
    params.order = invertedOrder[params.order];
  }

  return params as BooksParams;
};

const toBooksParams = (params: BooksParams) => {
  const localizedParams: any = {};

  (Object.keys(params) as Array<BookParam>).forEach(param => {
    const value = getParamValue(param, params);
    if (value && BOOKS_PARAMS_MAP[param]) {
      localizedParams[BOOKS_PARAMS_MAP[param]] = value.toString();
    }
  });

  const query = new URLSearchParams(localizedParams).toString();
  return `${ROUTE.BOOKS}${query ? `?${query}` : ''}`;
};

const routeWithRedirectionParam = (route: string) =>
  `${route}?${PARAMS.REDIRECTION.REDIRECTED}=${PARAMS.REDIRECTION.YES}`;

export { parseBooksParams, toBooksParams, routeWithRedirectionParam, DEFAULT_BOOK_PARAMS };
