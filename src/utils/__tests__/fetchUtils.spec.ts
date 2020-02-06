import {
  getBooksInfoUrl,
  getBookDetailsUrl,
  getRandomBookUrl,
  getBooksUrl,
  getBooksFilterParamsUrl,
} from '../fetchUtils';

describe('fetchUtils', () => {
  it('constructs books info URL properly', () => {
    expect(getBooksInfoUrl()).toBe('/api/books/info');
  });

  it('constructs book details URL properly', () => {
    expect(getBookDetailsUrl({ slug: 'example-slug' })).toBe('/api/books/example-slug');
  });

  it('constructs random book URL properly', () => {
    expect(getRandomBookUrl()).toBe('/api/books/random');
  });

  it('constructs books filter params URL properly', () => {
    expect(getBooksFilterParamsUrl()).toBe('/api/books/filterParams');
  });

  it('constructs books URL properly', () => {
    expect(getBooksUrl({ orderBy: 'TITLE' })).toBe('/api/books?orderBy=TITLE');
    expect(getBooksUrl({ orderBy: 'DATE_OF_ADDITION' })).toBe('/api/books?orderBy=DATE_OF_ADDITION');
    expect(getBooksUrl({ orderBy: 'YEAR_OF_ISSUE' })).toBe('/api/books?orderBy=YEAR_OF_ISSUE');

    expect(getBooksUrl({ order: 'ASC' })).toBe('/api/books?order=ASC');
    expect(getBooksUrl({ order: 'DESC' })).toBe('/api/books?order=DESC');

    expect(getBooksUrl({ page: 1 })).toBe('/api/books?page=1');

    expect(getBooksUrl({ size: 2 })).toBe('/api/books?size=2');

    expect(getBooksUrl({ tags: ['test1'] })).toBe('/api/books?tags=test1');
    expect(getBooksUrl({ tags: ['test1', 'test2'] })).toBe('/api/books?tags=test1,test2');

    expect(getBooksUrl({ bookSize: 'kratka' })).toBe('/api/books?bookSize=kratka');

    expect(getBooksUrl({ originalLanguage: 'english' })).toBe('/api/books?originalLanguage=english');

    expect(getBooksUrl()).toBe('/api/books');
    expect(getBooksUrl({ orderBy: 'YEAR_OF_ISSUE', order: 'ASC', page: 1, size: 2 })).toBe(
      '/api/books?order=ASC&orderBy=YEAR_OF_ISSUE&page=1&size=2'
    );
    expect(getBooksUrl({ order: 'ASC', page: 1, size: 2 })).toBe('/api/books?order=ASC&page=1&size=2');
    expect(getBooksUrl({ page: 1, size: 2 })).toBe('/api/books?page=1&size=2');
    expect(getBooksUrl({ order: 'ASC', originalLanguage: 'english', page: 1 })).toBe(
      '/api/books?order=ASC&originalLanguage=english&page=1'
    );
    expect(getBooksUrl({ order: 'ASC', tags: ['test1', 'test2', 'test3'], page: 1 })).toBe(
      '/api/books?order=ASC&page=1&tags=test1,test2,test3'
    );
  });
});
