const jsonServer = require('json-server');
const url = require('url');

const { books } = require('./fakeData');

const server = jsonServer.create();
const router = jsonServer.router({
  details: [
    {
      id: 1,
      total: books.length,
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

// add support for singular query param https://github.com/typicode/json-server/issues/541
server.use((req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const _send = res.send;
  // eslint-disable-next-line func-names
  res.send = function(body) {
    if (url.parse(req.url, true).query.singular) {
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
    '/api/books/total': '/api/details/1',
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
