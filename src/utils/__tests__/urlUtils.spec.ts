import { parseBooksParams, routeWithRedirectionParam, toBooksParams } from '../urlUtils';

describe('urlUtils', () => {
  it('builds books URL with params correctly', () => {
    const book1 = toBooksParams({});
    const book2 = toBooksParams({
      pageSize: 10,
      order: 'ASC',
      orderBy: 'TITLE',
      page: 2,
    });
    const book3 = toBooksParams({
      pageSize: 10,
    });
    const book4 = toBooksParams({
      order: 'ASC',
    });
    const book5 = toBooksParams({
      orderBy: 'TITLE',
    });
    const book6 = toBooksParams({
      page: 2,
    });
    const book7 = toBooksParams({
      page: 2,
      orderBy: 'TITLE',
    });

    expect(book1).toBe('/knihy');
    expect(book2).toBe('/knihy?knihNaStranku=10&poradi=VZESTUPNE&seraditPodle=NAZEV&stranka=2');
    expect(book3).toBe('/knihy?knihNaStranku=10');
    expect(book4).toBe('/knihy?poradi=VZESTUPNE');
    expect(book5).toBe('/knihy?seraditPodle=NAZEV');
    expect(book6).toBe('/knihy?stranka=2');
    expect(book7).toBe('/knihy?stranka=2&seraditPodle=NAZEV');
  });

  it('parses books URL with params correctly', () => {
    const params1 = parseBooksParams('knihNaStranku=10&poradi=VZESTUPNE&stranka=2');
    const params2 = parseBooksParams('knihNaStranku=10&poradi=VZESTUPNE&seraditPodle=NAZEV&stranka=2');
    const params3 = parseBooksParams('knihNaStranku=10&nonExistingParam=something');

    expect(params1).toStrictEqual({
      order: 'ASC',
      page: 2,
      pageSize: 10,
    });
    expect(params2).toStrictEqual({
      orderBy: 'TITLE',
      order: 'ASC',
      page: 2,
      pageSize: 10,
    });
    expect(params3).toStrictEqual({
      pageSize: 10,
    });
  });

  it('constructs correctly route with redirection parameter', () => {
    const routeWithRedirection = routeWithRedirectionParam('/route');

    expect(routeWithRedirection).toBe('/route?presmerovano=ano');
  });
});
