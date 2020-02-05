import { getBooksInfoUrl, getBookDetailsUrl, getRandomBook, getBooksUrl } from '../fetchUtils';

describe('fetchUtils', () => {
  it('constructs books info URL properly', () => {
    expect(getBooksInfoUrl()).toBe('/api/books/info');
  });

  it('constructs book details URL properly', () => {
    expect(getBookDetailsUrl({ slug: 'example-slug' })).toBe('/api/books/example-slug');
  });

  it('constructs random book URL properly', () => {
    expect(getRandomBook()).toBe('/api/books/random');
  });

  it('constructs books URL properly', () => {
    expect(getBooksUrl({ orderBy: 'TITLE' })).toBe('/api/books?orderBy=TITLE');
    expect(getBooksUrl({ orderBy: 'DATE_OF_ADDITION' })).toBe('/api/books?orderBy=DATE_OF_ADDITION');
    expect(getBooksUrl({ orderBy: 'YEAR_OF_ISSUE' })).toBe('/api/books?orderBy=YEAR_OF_ISSUE');

    expect(getBooksUrl({ order: 'ASC' })).toBe('/api/books?order=ASC');
    expect(getBooksUrl({ order: 'DESC' })).toBe('/api/books?order=DESC');

    expect(getBooksUrl({ page: 1 })).toBe('/api/books?page=1');
    expect(getBooksUrl({ size: 2 })).toBe('/api/books?size=2');

    expect(getBooksUrl()).toBe('/api/books');
    expect(getBooksUrl({ orderBy: 'YEAR_OF_ISSUE', order: 'ASC', page: 1, size: 2 })).toBe(
      '/api/books?orderBy=YEAR_OF_ISSUE&order=ASC&page=1&size=2'
    );
    expect(getBooksUrl({ order: 'ASC', page: 1, size: 2 })).toBe('/api/books?order=ASC&page=1&size=2');
    expect(getBooksUrl({ page: 1, size: 2 })).toBe('/api/books?page=1&size=2');
    expect(getBooksUrl({ order: 'ASC', page: 1 })).toBe('/api/books?order=ASC&page=1');
  });
});
