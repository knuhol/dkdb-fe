/* eslint-disable no-console, no-underscore-dangle */
const express = require('express');
const url = require('url');
const chalk = require('chalk');
const _orderBy = require('lodash/orderBy');
const _filter = require('lodash/filter');
const _omit = require('lodash/omit');
const _map = require('lodash/map');
const _random = require('lodash/random');

const { books, filterParams, info } = require('./fakeData');
const { TOTAL, BOOK_SIZES } = require('./fakeDataConfig');

const DEFAULT = {
  PAGE: 0,
  PAGE_SIZE: 5,
  ORDER: 'DESC',
  ORDER_BY: 'DATE_OF_ADDITION',
};
const ORDER_BY = {
  DATE_OF_ADDITION: 'dateOfAddition',
  YEAR_OF_ISSUE: 'yearOfIssue',
  TITLE: 'title',
};
const ONLY_BOOK_DETAIL_PARAMS = ['description', 'isbn', 'numberOfPages', 'originalLanguage', 'publisher', 'links'];

const server = express();
const router = express.Router();
const host = process.argv[2];
const port = process.argv[3];
const API_ROOT = '/api';

const getTime = () => {
  const date = new Date();
  return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
};

router.get('/books/info', (req, res) => {
  res.json(info);
});
router.get('/books/filterParams', (req, res) => {
  res.json(filterParams);
});
router.get('/books/random', (req, res) => {
  res.json(books[_random(0, TOTAL.BOOKS - 1)]);
});
router.get('/books/:slug', (req, res) => {
  res.json(_filter(books, { slug: req.params.slug })[0]);
});
router.get('/books', (req, res) => {
  const { query } = req;
  const page = parseInt(query.page, 10) || DEFAULT.PAGE;
  const pageSize = parseInt(query.size, 10) || DEFAULT.PAGE_SIZE;
  const order = query.order || DEFAULT.ORDER;
  const orderBy = query.orderBy || DEFAULT.ORDER_BY;
  let booksResult = books;

  // tags
  if (query.tags) {
    query.tags.split(',').forEach(tag => {
      booksResult = _filter(booksResult, { tags: [{ slug: tag }] });
    });
  }

  // bookSize
  if (query.bookSize) {
    booksResult = _filter(booksResult, book => {
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
  }

  // originalLanguage
  if (query.originalLanguage) {
    booksResult = _filter(booksResult, { originalLanguage: query.originalLanguage });
  }

  // order and orderBy
  booksResult = _orderBy(booksResult, [ORDER_BY[orderBy]], [order.toLowerCase()]);

  // save total number of books before pagination
  const total = booksResult.length;

  // page and size
  booksResult = booksResult.slice(page * pageSize, page * pageSize + pageSize);

  // omit detail params
  booksResult = _map(booksResult, book => _omit(book, ONLY_BOOK_DETAIL_PARAMS));

  res.json({ total, books: booksResult });
});

server.use((req, res, next) => {
  // log all requests
  const fullUrl = url.format({ protocol: req.protocol, host: req.get('host'), pathname: req.originalUrl });
  console.log(chalk.green(`${getTime()} GET ${fullUrl}`));
  next();
});
server.use(API_ROOT, router);

server.listen(port, () => {
  const apiUrl = `http://${host}:${port}/${API_ROOT}`;
  console.log(`${chalk.cyan(`${getTime()} API mock server started at ${chalk.underline(apiUrl)}, listening...`)}`);
});
