import ReactGA, { EventArgs } from 'react-ga';
import { Location } from 'history';

import { GA_DEBUG_ALLOWED } from '../config';

const { REACT_APP_GA_TRACKING_ID: GA_TRACKING_ID } = process.env;
const isGaEnabled = GA_TRACKING_ID != null;

if (GA_TRACKING_ID) {
  ReactGA.initialize(GA_TRACKING_ID, { debug: GA_DEBUG_ALLOWED, testMode: process.env.NODE_ENV === 'test' });
}

enum CATEGORY {
  HOME = 'Home',
  MENU = 'Menu',
  BOOKS = 'Books',
  TAG = 'Tag',
  FILTER = 'Filter',
  BOOK = 'Book',
  PAGINATION = 'Pagination',
  EXTERNAL = 'External',
}

enum HOME_ACTION {
  BOOKS = 'Books',
  ABOUT = 'About',
}

enum MENU_ACTION {
  HOME = 'Home',
  BOOKS = 'Books',
  RANDOM_BOOK = 'Random Book',
  ABOUT = 'About',
}

enum BOOKS_ACTION {
  BOOK_DETAIL_BUTTON = 'Book Detail - Button',
  BOOK_DETAIL_COVER = 'Book Detail - Cover',
}

enum TAG_ACTION {
  ONE_TAG = 'One Tag',
}

enum FILTER_ACTION {
  ORDER_BY = 'Order By',
  ORDER = 'Order',
  PAGE_SIZE = 'Page Size',
  TAGS = 'Tags',
  ORIGINAL_LANGUAGE = 'Original Language',
  BOOK_SIZE = 'Book Size',
  APPLY = 'Apply',
  RESET_DEFAULT = 'Reset - Default',
  RESET_NO_RESULTS = 'Reset - No Results',
}
export type FilterConfirmationAction =
  | FILTER_ACTION.APPLY
  | FILTER_ACTION.RESET_DEFAULT
  | FILTER_ACTION.RESET_NO_RESULTS;
export type FilterChangeAction =
  | FILTER_ACTION.ORDER_BY
  | FILTER_ACTION.ORDER
  | FILTER_ACTION.PAGE_SIZE
  | FILTER_ACTION.TAGS
  | FILTER_ACTION.ORIGINAL_LANGUAGE
  | FILTER_ACTION.BOOK_SIZE;

enum BOOK_ACTION {
  GOODREADS = 'Goodreads',
  CBDB = 'CBDB',
  DATABAZE_KNIH = 'Databaze knih',
  BACK = 'Back',
  RANDOM = 'Random',
}
export type BookDbLinkAction = BOOK_ACTION.GOODREADS | BOOK_ACTION.CBDB | BOOK_ACTION.DATABAZE_KNIH;

enum PAGINATION_ACTION {
  PAGE = 'Page',
  PREVIOUS = 'Previous',
  NEXT = 'Next',
  MORE = 'More',
}

enum EXTERNAL_ACTION {
  LINK = 'Link',
}

enum EXTERNAL_LINK {
  DKDB_FE = 'DKDB FE',
  DKDB_BE = 'DKDB BE',
  LINKED_IN_KNUT = 'LinkedIn - Knut Holm',
  LINKED_IN_TEREZA = 'LinkedIn - Tereza Holm',
  MAIL_TO_INFO = 'Mail To - Info',
}

const locationToString = (location: Location) => {
  const { pathname, search } = location;

  return pathname + search;
};

const trackPageView = (location: Location) => {
  if (isGaEnabled) {
    ReactGA.pageview(locationToString(location));
  }
};

const trackHome = (action: HOME_ACTION) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.HOME, action });
  }
};

const trackMenu = (action: MENU_ACTION) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.MENU, action });
  }
};

const trackBooks = (action: BOOKS_ACTION, bookTitle: string) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.BOOKS, action, label: bookTitle });
  }
};

const trackTag = (name: string) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.TAG, action: TAG_ACTION.ONE_TAG, label: name });
  }
};

const trackFilterChange = (action: FilterChangeAction, value: string | number) => {
  if (isGaEnabled) {
    const params: EventArgs = {
      category: CATEGORY.FILTER,
      action,
    };

    if (typeof value === 'number') {
      params.value = value;
    } else {
      params.label = value;
    }

    ReactGA.event(params);
  }
};

const trackFilterConfirmation = (action: FilterConfirmationAction, location?: Location) => {
  if (isGaEnabled) {
    const params: EventArgs = {
      category: CATEGORY.FILTER,
      action,
    };

    if (location != null) {
      params.label = locationToString(location);
    }

    ReactGA.event(params);
  }
};

const trackBook = (action: BOOK_ACTION, bookTitle: string) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.BOOK, action, label: bookTitle });
  }
};

const trackPagination = (action: PAGINATION_ACTION, page: number) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.PAGINATION, action, value: page });
  }
};

const trackExternalLink = (link: EXTERNAL_LINK) => () => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.EXTERNAL, action: EXTERNAL_ACTION.LINK, label: link });
  }
};

export {
  GA_TRACKING_ID,
  isGaEnabled,
  trackPageView,
  trackHome,
  trackMenu,
  trackBooks,
  trackTag,
  trackFilterChange,
  trackFilterConfirmation,
  trackBook,
  trackPagination,
  trackExternalLink,
  HOME_ACTION,
  MENU_ACTION,
  BOOKS_ACTION,
  FILTER_ACTION,
  BOOK_ACTION,
  PAGINATION_ACTION,
  EXTERNAL_ACTION,
  EXTERNAL_LINK,
};
