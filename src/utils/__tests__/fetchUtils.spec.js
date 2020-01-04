import { getTotalBooksUrl, getBookDetailsUrl, getBooksUrl } from '../fetchUtils';

jest.mock('../configUtils', () => {
  return {
    buildBaseUrl: endpoint => `uri${endpoint}`,
  };
});

describe('fetchUtils', () => {
  it('construct total books URL properly', () => {
    expect(getTotalBooksUrl()).toBe('uri/books/total');
  });

  it('construct book details URL properly', () => {
    expect(getBookDetailsUrl({ id: 1 })).toBe('uri/books/1');
  });

  it('construct books URL properly', () => {
    expect(getBooksUrl({ orderBy: 'AUTHOR' })).toBe('uri/books?orderBy=AUTHOR');
    expect(getBooksUrl({ orderBy: 'TITLE' })).toBe('uri/books?orderBy=TITLE');
    expect(getBooksUrl({ orderBy: 'DATE_OF_ADDITION' })).toBe('uri/books?orderBy=DATE_OF_ADDITION');
    expect(getBooksUrl({ orderBy: 'YEAR_OF_ISSUE' })).toBe('uri/books?orderBy=YEAR_OF_ISSUE');

    expect(getBooksUrl({ order: 'ASC' })).toBe('uri/books?order=ASC');
    expect(getBooksUrl({ order: 'DESC' })).toBe('uri/books?order=DESC');

    expect(getBooksUrl({ from: 1 })).toBe('uri/books?from=1');
    expect(getBooksUrl({ to: 2 })).toBe('uri/books?to=2');

    expect(getBooksUrl()).toBe('uri/books');
    expect(getBooksUrl({ orderBy: 'AUTHOR', order: 'ASC', from: 1, to: 2 })).toBe(
      'uri/books?orderBy=AUTHOR&order=ASC&from=1&to=2'
    );
    expect(getBooksUrl({ order: 'ASC', from: 1, to: 2 })).toBe('uri/books?order=ASC&from=1&to=2');
    expect(getBooksUrl({ from: 1, to: 2 })).toBe('uri/books?from=1&to=2');
    expect(getBooksUrl({ order: 'ASC', from: 1 })).toBe('uri/books?order=ASC&from=1');
  });
});
