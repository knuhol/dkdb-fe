import { areBooksParamsDefault, parseBooksParams, routeWithRedirectionParam, toBooksParams } from '../urlUtils';

describe('urlUtils', () => {
  it('builds books URL with params correctly', () => {
    const book1 = toBooksParams({
      page: 1,
      order: 'DESC',
      orderBy: 'DATE_OF_ADDITION',
      pageSize: 5,
    });
    const book2 = toBooksParams({
      pageSize: 10,
      order: 'ASC',
      orderBy: 'TITLE',
      page: 2,
    });

    expect(book1).toBe('/knihy');
    expect(book2).toBe('/knihy?knihNaStranku=10&poradi=VZESTUPNE&seraditPodle=NAZEV&stranka=2');
  });

  it('parses books URL with params correctly', () => {
    const params1 = parseBooksParams('knihNaStranku=10&poradi=VZESTUPNE&stranka=2');
    const params2 = parseBooksParams('knihNaStranku=10&poradi=VZESTUPNE&seraditPodle=NAZEV&stranka=2');
    const params3 = parseBooksParams('knihNaStranku=10&nonExistingParam=something');

    expect(params1).toStrictEqual({
      orderBy: 'DATE_OF_ADDITION',
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
      orderBy: 'DATE_OF_ADDITION',
      order: 'DESC',
      page: 1,
      pageSize: 10,
    });
  });

  it('checks correctly if books params are default', () => {
    const params1 = areBooksParamsDefault({
      orderBy: 'DATE_OF_ADDITION',
      order: 'DESC',
      page: 1,
      pageSize: 5,
    });
    const params2 = areBooksParamsDefault({
      orderBy: 'DATE_OF_ADDITION',
      order: 'ASC',
      page: 2,
      pageSize: 10,
    });
    const params3 = areBooksParamsDefault({
      orderBy: 'DATE_OF_ADDITION',
      order: 'DESC',
      pageSize: 5,
    });
    const params4 = areBooksParamsDefault({
      orderBy: 'DATE_OF_ADDITION',
      order: 'ASC',
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
