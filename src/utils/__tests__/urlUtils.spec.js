import { areBooksParamsDefault, parseBooksParams, routeWithRedirectionParam, toBooksParams } from '../urlUtils';

const ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const ORDER_BY = {
  TITLE: 'TITLE',
  YEAR_OF_ISSUE: 'YEAR_OF_ISSUE',
  DATE_OF_ADDITION: 'DATE_OF_ADDITION',
};

describe('urlUtils', () => {
  it('builds books URL with params correctly', () => {
    const book1 = toBooksParams();
    const book2 = toBooksParams({
      page: 1,
      order: ORDER.DESC,
      orderBy: ORDER_BY.DATE_OF_ADDITION,
      pageSize: 5,
    });
    const book3 = toBooksParams({
      orderBy: ORDER_BY.DATE_OF_ADDITION,
      pageSize: 10,
    });
    const book4 = toBooksParams({
      pageSize: 10,
      order: ORDER.ASC,
      orderBy: ORDER_BY.TITLE,
      page: 2,
      nonExistingParam: 'something',
    });

    expect(book1).toBe('/knihy');
    expect(book2).toBe('/knihy');
    expect(book3).toBe('/knihy?knihNaStranku=10');
    expect(book4).toBe('/knihy?knihNaStranku=10&poradi=VZESTUPNE&seraditPodle=NAZEV&stranka=2');
  });

  it('parses books URL with params correctly', () => {
    const params1 = parseBooksParams();
    const params2 = parseBooksParams('knihNaStranku=10&poradi=VZESTUPNE&stranka=2');
    const params3 = parseBooksParams('knihNaStranku=10&poradi=VZESTUPNE&seraditPodle=NAZEV&stranka=2');
    const params4 = parseBooksParams('knihNaStranku=10&nonExistingParam=something');

    expect(params1).toStrictEqual({
      orderBy: ORDER_BY.DATE_OF_ADDITION,
      order: ORDER.DESC,
      page: 1,
      pageSize: 5,
    });
    expect(params2).toStrictEqual({
      orderBy: ORDER_BY.DATE_OF_ADDITION,
      order: ORDER.ASC,
      page: 2,
      pageSize: 10,
    });
    expect(params3).toStrictEqual({
      orderBy: ORDER_BY.TITLE,
      order: ORDER.ASC,
      page: 2,
      pageSize: 10,
    });
    expect(params4).toStrictEqual({
      orderBy: ORDER_BY.DATE_OF_ADDITION,
      order: ORDER.DESC,
      page: 1,
      pageSize: 10,
    });
  });

  it('checks correctly if books params are default', () => {
    const params1 = areBooksParamsDefault({
      orderBy: ORDER_BY.DATE_OF_ADDITION,
      order: ORDER.DESC,
      page: 1,
      pageSize: 5,
    });
    const params2 = areBooksParamsDefault({
      orderBy: ORDER_BY.DATE_OF_ADDITION,
      order: ORDER.ASC,
      page: 2,
      pageSize: 10,
    });
    const params3 = areBooksParamsDefault({
      orderBy: ORDER_BY.DATE_OF_ADDITION,
      order: ORDER.DESC,
      pageSize: 5,
    });
    const params4 = areBooksParamsDefault({
      orderBy: ORDER_BY.DATE_OF_ADDITION,
      order: ORDER.ASC,
      pageSize: 5,
    });

    expect(params1).toBe(true);
    expect(params2).toBe(false);
    expect(params3).toBe(true);
    expect(params4).toBe(false);
  });

  it('constructs correctly route with redirection parameter', () => {
    const routeWithRedirection = routeWithRedirectionParam('/route');

    expect(routeWithRedirection).toBe('/route?presmerovano=ano');
  });
});
