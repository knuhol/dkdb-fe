const jsonServer = require('json-server');
const filter = require('lodash/filter');
const random = require('lodash/random');
const url = require('url');

const { books, filterParams, info } = require('./fakeData');
const { TOTAL, BOOK_SIZES } = require('./fakeDataConfig');

const server = jsonServer.create();
const router = jsonServer.router({
  info: [
    {
      id: 1,
      ...info,
    },
  ],
  filterParams: [
    {
      id: 1,
      ...filterParams,
    },
  ],
  books,
});
const middlewares = jsonServer.defaults();

const QUERY_VALUES_MAP = {
  ASC: 'asc',
  DESC: 'desc',
  TITLE: 'title',
  YEAR_OF_ISSUE: 'yearOfIssue',
  DATE_OF_ADDITION: 'dateOfAddition',
};

const QUERY_PARAMS_MAP = {
  order: '_order',
  orderBy: '_sort',
  page: '_page',
  size: '_limit',
};

// rewrite URL query from original API to JSON server API
server.use((req, res, next) => {
  Object.keys(req.query).forEach(param => {
    // remove tags, bookSize and random params to prevent original json-mock filter
    if (param === 'tags' || param === 'bookSize' || param === 'random') {
      delete req.query[param];
    }

    if (Object.prototype.hasOwnProperty.call(QUERY_PARAMS_MAP, param)) {
      // index pages from 1, not from 0
      if (param === 'page') {
        req.query[param] = parseInt(req.query[param], 10) + 1;
      }
      if (QUERY_VALUES_MAP[req.query[param]]) {
        req.query[param] = QUERY_VALUES_MAP[req.query[param]];
      }
      req.query[QUERY_PARAMS_MAP[param]] = req.query[param];
      delete req.query[param];
    }
  });
  next();
});

server.use((req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const _send = res.send;
  // eslint-disable-next-line func-names
  res.send = function(body) {
    const { query } = url.parse(req.url, true);

    // filter book size
    if (query.bookSize) {
      let json = JSON.parse(body);
      json = filter(json, book => {
        const { numberOfPages } = book;
        if (query.bookSize === BOOK_SIZES.SLUG.SHORT) {
          return numberOfPages <= BOOK_SIZES.SIZE.SHORT;
        }
        if (query.bookSize === BOOK_SIZES.SLUG.MIDDLE) {
          return numberOfPages > BOOK_SIZES.SIZE.SHORT && numberOfPages <= BOOK_SIZES.SIZE.MIDDLE;
        }
        if (query.bookSize === BOOK_SIZES.SLUG.LONG) {
          return numberOfPages > BOOK_SIZES.SIZE.MIDDLE;
        }
        return false;
      });
      return _send.call(this, JSON.stringify(json));
    }

    // filter tags with AND logic
    if (query.tags) {
      let json = JSON.parse(body);
      query.tags.split(',').forEach(tag => {
        json = filter(json, { tags: [{ slug: tag }] });
      });
      return _send.call(this, JSON.stringify(json));
    }

    // get random book
    if (query.random) {
      const json = JSON.parse(body);
      return _send.call(this, JSON.stringify(json[random(0, TOTAL.BOOKS - 1)]));
    }

    // add support for singular query param https://github.com/typicode/json-server/issues/541
    if (query.singular) {
      const json = JSON.parse(body);
      if (Array.isArray(json)) {
        if (json.length === 1) {
          return _send.call(this, JSON.stringify(json[0]));
        }
        if (json.length === 0) {
          return _send.call(this, '{}', 404);
        }
      }
    }

    return _send.call(this, body);
  };

  next();
});

// rewrite simple routes
server.use(
  jsonServer.rewriter({
    '/api/books/info': '/api/info/1',
    '/api/books/filterParams': '/api/filterParams/1',
    '/api/books/random': '/api/books?random=true',
    '/api/books/:slug': '/api/books?slug=:slug&singular=1',
  })
);

// use standard middlewares
server.use(middlewares);

// prefix all endpoints with /api
server.use('/api', router);

// start JSON server
server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('JSON Server is running');
});
