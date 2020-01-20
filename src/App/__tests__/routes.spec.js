import { booksWithParams, PARAMS } from '../routes';

describe('routes', () => {
  it('builds book with params correctly', () => {
    const book1 = booksWithParams({
      page: 1,
      order: PARAMS.ORDER.ASC,
      orderBy: PARAMS.ORDER_BY.YEAR_OF_ISSUE,
      size: 10,
    });
    const book2 = booksWithParams({
      orderBy: PARAMS.ORDER_BY.DATE_OF_ADDITION,
      size: 10,
      order: PARAMS.ORDER.DESC,
      page: 1,
    });
    const book3 = booksWithParams({
      size: 5,
      order: PARAMS.ORDER.DESC,
      orderBy: PARAMS.ORDER_BY.TITLE,
      page: 10,
      nonExistingParam: 'something',
    });
    const book4 = booksWithParams();

    expect(book1).toBe('/knihy?stranka=1&poradi=VZESTUPNE&seraditPodle=ROK_VYDANI&knihNaStranku=10');
    expect(book2).toBe('/knihy?seraditPodle=DATUM_PRIDANI&knihNaStranku=10&poradi=SESTUPNE&stranka=1');
    expect(book3).toBe('/knihy?knihNaStranku=5&poradi=SESTUPNE&seraditPodle=NAZEV&stranka=10');
    expect(book4).toBe('/knihy');
  });
});
