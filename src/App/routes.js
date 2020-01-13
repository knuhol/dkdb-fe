const PARAMS = {
  BOOK_DETAIL: {
    ID: ':id',
  },
};

const ROUTE = {
  HOME: '/',
  BOOKS: '/knihy',
  BOOK_DETAIL: `/kniha/${PARAMS.BOOK_DETAIL.ID}`,
  ERROR_404: '/chyba/404',
  ERROR_500: '/chyba/500',
};

export { ROUTE, PARAMS };
