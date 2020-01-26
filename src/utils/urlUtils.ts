import queryString from 'query-string';
import invert from 'lodash/invert';
import some from 'lodash/some';

import { Order, OrderBy, PARAMS, ROUTE } from '../App/routes';

type BooksParamsBase = {
  orderBy: keyof typeof PARAMS.ORDER_BY;
  order: keyof typeof PARAMS.ORDER;
  pageSize: number;
};

type BooksParams = BooksParamsBase & {
  page: number;
};

type BooksParamsWithOptionalPage = BooksParamsBase & {
  page?: number;
};

const BOOKS_PARAMS_MAP = {
  orderBy: PARAMS.BOOKS.ORDER_BY,
  order: PARAMS.BOOKS.ORDER,
  page: PARAMS.BOOKS.PAGE,
  pageSize: PARAMS.BOOKS.PAGE_SIZE,
};

const DEFAULT_BOOK_PARAMS = {
  orderBy: PARAMS.ORDER_BY.DATE_OF_ADDITION,
  order: PARAMS.ORDER.DESC,
  page: 1,
  pageSize: 5,
};

type BookParam = keyof typeof DEFAULT_BOOK_PARAMS;

const getParamValue = (param: any, params: any) => {
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
  } else {
    params.orderBy = invertedOrderBy[DEFAULT_BOOK_PARAMS.orderBy];
  }

  if (params.order && invertedOrder[params.order]) {
    params.order = invertedOrder[params.order];
  } else {
    params.order = invertedOrder[DEFAULT_BOOK_PARAMS.order];
  }

  if (!params.page) {
    params.page = DEFAULT_BOOK_PARAMS.page;
  }

  if (!params.pageSize) {
    params.pageSize = DEFAULT_BOOK_PARAMS.pageSize;
  }

  return params as BooksParams;
};

const toBooksParams = (params: BooksParamsWithOptionalPage) => {
  const localizedParams: any = {};
  Object.keys(params).forEach(param => {
    const value = getParamValue(param, params);
    if (value && BOOKS_PARAMS_MAP[param as BookParam] && value !== DEFAULT_BOOK_PARAMS[param as BookParam]) {
      localizedParams[BOOKS_PARAMS_MAP[param as BookParam]] = value.toString();
    }
  });

  const query = new URLSearchParams(localizedParams).toString();
  return `${ROUTE.BOOKS}${query ? `?${query}` : ''}`;
};

const areBooksParamsDefault = (params: BooksParamsWithOptionalPage) => {
  return !some(Object.keys(params), param => {
    const value = getParamValue(param, params);
    return DEFAULT_BOOK_PARAMS[param as BookParam] !== value;
  });
};

const routeWithRedirectionParam = (route: string) =>
  `${route}?${PARAMS.REDIRECTION.REDIRECTED}=${PARAMS.REDIRECTION.YES}`;

export { parseBooksParams, toBooksParams, routeWithRedirectionParam, areBooksParamsDefault };
