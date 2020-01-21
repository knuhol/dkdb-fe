// @flow
const PARAMS = {
  BOOK_DETAIL: {
    ID: ':id',
  },
  BOOKS: {
    PAGE: 'stranka',
    ORDER: 'poradi',
    ORDER_BY: 'seraditPodle',
    SIZE: 'knihNaStranku',
  },
  ORDER_BY: {
    TITLE: 'NAZEV',
    DATE_OF_ADDITION: 'DATUM_PRIDANI',
    YEAR_OF_ISSUE: 'ROK_VYDANI',
  },
  ORDER: {
    ASC: 'VZESTUPNE',
    DESC: 'SESTUPNE',
  },
  REDIRECTION: {
    REDIRECTED: 'presmerovano',
    YES: 'ano',
  },
};

const ROUTE = {
  HOME: '/',
  BOOKS: '/knihy',
  BOOK_DETAIL: `/kniha/${PARAMS.BOOK_DETAIL.ID}`,
  ERROR_404: '/chyba/404-stranka-nenalezena',
  ERROR_500: '/chyba/500-neocekavana-chyba',
};

type BooksParams = {
  orderBy?: $Keys<typeof PARAMS.ORDER_BY>,
  order?: $Keys<typeof PARAMS.ORDER>,
  page?: number,
  size?: number,
};

const BOOKS_PARAMS_MAP = {
  orderBy: PARAMS.BOOKS.ORDER_BY,
  order: PARAMS.BOOKS.ORDER,
  page: PARAMS.BOOKS.PAGE,
  size: PARAMS.BOOKS.SIZE,
};

const booksWithParams = (params: BooksParams = {}) => {
  const mappedParams = {};
  Object.keys(params).forEach(param => {
    if (params[param] && BOOKS_PARAMS_MAP[param]) {
      mappedParams[BOOKS_PARAMS_MAP[param]] = params[param].toString();
    }
  });
  const query = new URLSearchParams(mappedParams).toString();
  return `${ROUTE.BOOKS}${query ? `?${query}` : ''}`;
};

const routeWithRedirectionParam = (route: string) =>
  `${route}?${PARAMS.REDIRECTION.REDIRECTED}=${PARAMS.REDIRECTION.YES}`;

export { ROUTE, PARAMS, booksWithParams, routeWithRedirectionParam };
