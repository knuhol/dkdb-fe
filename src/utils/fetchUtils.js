import { buildUrl } from './urlUtils';

const appendToUri = (uri, paramName, text) => `${uri}${uri.includes('?') ? '&' : '?'}${paramName}=${text}`;

// TODO: Use some library for this?
const validateAndAppendParam = ({ param, paramValue, condition, errorMessage, endpoint }) => {
  if (condition) {
    endpoint = appendToUri(endpoint, param, paramValue);
  } else if (paramValue) {
    throw new Error(errorMessage);
  }

  return endpoint;
};

const ORDER_BY = {
  AUTHOR: 'AUTHOR',
  TITLE: 'TITLE',
  DATE_OF_ADDITION: 'DATE_OF_ADDITION',
  YEAR_OF_ISSUE: 'YEAR_OF_ISSUE',
};

const ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const getTotalBooksUrl = () => {
  return buildUrl('/books/total');
};

const getBookDetailsUrl = ({ id }) => {
  // validate param 'id'
  if (typeof id !== 'number') {
    throw new Error("You need to provide param 'id' which has to be a number");
  }

  return buildUrl(`/books/${id}`);
};

const getBooksUrl = ({ orderBy, order, from, to } = {}) => {
  let endpoint = '/books';

  // validate param 'orderBy'
  endpoint = validateAndAppendParam({
    param: 'orderBy',
    paramValue: orderBy,
    condition: orderBy && ORDER_BY.hasOwnProperty(orderBy),
    errorMessage: `Param 'orderBy' has to be one of following values: ${Object.keys(ORDER_BY).join(', ')}.`,
    endpoint,
  });

  // validate param 'order'
  endpoint = validateAndAppendParam({
    param: 'order',
    paramValue: order,
    condition: order && ORDER.hasOwnProperty(order),
    errorMessage: `Param 'order' has to be one of following values: ${Object.keys(ORDER).join(', ')}.`,
    endpoint,
  });

  // validate param 'from'
  endpoint = validateAndAppendParam({
    param: 'from',
    paramValue: from,
    condition: from && typeof from === 'number',
    errorMessage: "Param 'from' has to be number",
    endpoint,
  });

  // validate param 'to'
  endpoint = validateAndAppendParam({
    param: 'to',
    paramValue: to,
    condition: to && typeof to === 'number',
    errorMessage: "Param 'to' has to be number",
    endpoint,
  });

  return buildUrl(endpoint);
};

export { ORDER_BY, ORDER, getTotalBooksUrl, getBookDetailsUrl, getBooksUrl };
