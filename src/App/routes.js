// @flow
const PARAMS = {
  BOOK_DETAIL: {
    SLUG: ':slug',
  },
  BOOKS: {
    PAGE: 'stranka',
    ORDER: 'poradi',
    ORDER_BY: 'seraditPodle',
    PAGE_SIZE: 'knihNaStranku',
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
  BOOK_DETAIL: `/kniha/${PARAMS.BOOK_DETAIL.SLUG}`,
  ERROR_404: '/chyba/404-stranka-nenalezena',
  ERROR_500: '/chyba/500-neocekavana-chyba',
};

export { ROUTE, PARAMS };
