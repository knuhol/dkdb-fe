const PARAMS = {
  BOOK_DETAIL: {
    SLUG: ':slug',
  },
  BOOKS: {
    PAGE: 'stranka',
    ORDER: 'poradi',
    ORDER_BY: 'seraditPodle',
    PAGE_SIZE: 'knihNaStranku',
    TAGS: 'tagy',
    BOOK_SIZE: 'delkaKnihy',
    ORIGINAL_LANGUAGE: 'puvodniJazyk',
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
  RANDOM_BOOK: '/nahodna-kniha',
  ABOUT: '/o-projektu',
  BOOK_BY_SLUG: `/kniha/${PARAMS.BOOK_DETAIL.SLUG}`,
  ERROR_404: '/chyba/404-stranka-nenalezena',
  ERROR_500: '/chyba/500-neocekavana-chyba',
};

export type OrderBy = keyof typeof PARAMS.ORDER_BY;
export type Order = keyof typeof PARAMS.ORDER;

export { ROUTE, PARAMS };
