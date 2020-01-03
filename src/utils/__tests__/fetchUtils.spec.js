import { getTotalBooksUrl, getBookDetailsUrl, getBooksUrl, ORDER_BY, ORDER } from '../fetchUtils';

jest.mock('../urlUtils', () => {
  return {
    buildUrl: endpoint => `uri${endpoint}`,
  };
});

describe('fetchUtils', () => {
  it('construct total books URL properly', () => {
    expect(getTotalBooksUrl()).toBe('uri/books/total');
  });

  it('construct book details URL properly', () => {
    expect(getBookDetailsUrl({ id: 1 })).toBe('uri/books/1');
    expect(() => getBookDetailsUrl()).toThrow();
    expect(() => getBookDetailsUrl({ id: '1' })).toThrow();
  });

  it('construct books URL properly', () => {
    expect(getBooksUrl({ orderBy: ORDER_BY.AUTHOR })).toBe('uri/books?orderBy=AUTHOR');
    expect(getBooksUrl({ orderBy: ORDER_BY.TITLE })).toBe('uri/books?orderBy=TITLE');
    expect(getBooksUrl({ orderBy: ORDER_BY.DATE_OF_ADDITION })).toBe('uri/books?orderBy=DATE_OF_ADDITION');
    expect(getBooksUrl({ orderBy: ORDER_BY.YEAR_OF_ISSUE })).toBe('uri/books?orderBy=YEAR_OF_ISSUE');

    expect(getBooksUrl({ order: ORDER.ASC })).toBe('uri/books?order=ASC');
    expect(getBooksUrl({ order: ORDER.DESC })).toBe('uri/books?order=DESC');

    expect(getBooksUrl({ from: 1 })).toBe('uri/books?from=1');
    expect(getBooksUrl({ to: 2 })).toBe('uri/books?to=2');

    expect(() => getBooksUrl({ orderBy: 'invalid' })).toThrow();
    expect(() => getBooksUrl({ order: 'invalid' })).toThrow();
    expect(() => getBooksUrl({ from: 'invalid' })).toThrow();
    expect(() => getBooksUrl({ to: 'invalid' })).toThrow();

    expect(getBooksUrl()).toBe('uri/books');
    expect(getBooksUrl({ orderBy: ORDER_BY.AUTHOR, order: ORDER.ASC, from: 1, to: 2 })).toBe(
      'uri/books?orderBy=AUTHOR&order=ASC&from=1&to=2'
    );
    expect(getBooksUrl({ order: ORDER.ASC, from: 1, to: 2 })).toBe('uri/books?order=ASC&from=1&to=2');
    expect(getBooksUrl({ from: 1, to: 2 })).toBe('uri/books?from=1&to=2');
    expect(getBooksUrl({ from: 1, order: ORDER.ASC })).toBe('uri/books?order=ASC&from=1');
  });
});
