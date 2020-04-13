import ReactGA from 'react-ga';
import { Location } from 'history';

import { GA_DEBUG_ALLOWED } from '../config';

const { REACT_APP_GA_TRACKING_ID: GA_TRACKING_ID } = process.env;
const isGaEnabled = GA_TRACKING_ID != null;

if (GA_TRACKING_ID) {
  ReactGA.initialize(GA_TRACKING_ID, { testMode: GA_DEBUG_ALLOWED, debug: GA_DEBUG_ALLOWED });
}

enum CATEGORY {
  MAIN_PAGE = 'Main Page',
  MENU = 'Menu',
  BOOKS = 'Books',
  FILTER = 'Filter',
  BOOK = 'Book',
  PAGINATION = 'Pagination',
  EXTERNAL = 'External',
}

enum MAIN_PAGE_ACTION {
  BOOKS = 'Books',
  ABOUT = 'About',
}

enum MENU_ACTION {
  BOOKS = 'Books',
  RANDOM_BOOK = 'Random Book',
  ABOUT = 'About',
}

enum BOOKS_ACTION {
  MORE_INFO_BUTTON = 'More Info - Button',
  MORE_INFO_COVER = 'More Info - Cover',
  TAG = 'Tag',
}

enum FILTER_ACTION {
  APPLY = 'Apply',
  RESET_DEFAULT = 'Reset - Default',
  RESET_NO_RESULTS = 'Reset - No Results',
}

enum BOOK_ACTION {
  GOODREADS = 'Goodreads',
  CBDB = 'CBDB',
  DATABAZE_KNIH = 'Databaze knih',
  BACK = 'Back',
  RANDOM = 'Random',
}

enum PAGINATION_ACTION {
  PAGE = 'Page',
  PREVIOUS = 'Previous',
  NEXT = 'Next',
  MORE = 'More',
}

enum EXTERNAL_ACTION {
  LINK = 'Link',
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

const trackMainPage = (action: MAIN_PAGE_ACTION) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.MAIN_PAGE, action });
  }
};

const trackMenu = (action: MENU_ACTION) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.MENU, action });
  }
};

const trackBooksTag = (tag: string) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.BOOKS, action: BOOKS_ACTION.TAG, label: tag });
  }
};

const trackBooksMoreInfo = (
  action: BOOKS_ACTION.MORE_INFO_BUTTON | BOOKS_ACTION.MORE_INFO_COVER,
  bookTitle: string
) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.BOOKS, action, label: bookTitle });
  }
};

const trackFilter = (action: FILTER_ACTION, location: Location) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.FILTER, action, label: locationToString(location) });
  }
};

const trackBook = (action: BOOK_ACTION, bookTitle: string) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.MENU, action, label: bookTitle });
  }
};

const trackPagination = (action: PAGINATION_ACTION, page: number) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.PAGINATION, action, value: page });
  }
};

const trackExternalAction = (url: string) => {
  if (isGaEnabled) {
    ReactGA.event({ category: CATEGORY.EXTERNAL, action: EXTERNAL_ACTION.LINK, label: url });
  }
};

export { GA_TRACKING_ID, isGaEnabled, trackPageView };
