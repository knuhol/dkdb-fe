import React from 'react';
import fetchMock from 'fetch-mock';
import { fireEvent, waitForDomChange } from '@testing-library/react';

import Books, { getTitleAndDescription } from '../index';
import { renderWithRouter } from '../../../utils/testUtils';

import booksMock from '../__mocks__/books.json';
import filterParams from '../__mocks__/filterParams.json';

const API_BOOKS_REGEX = /^(\/api\/books)(\/?\?{0}|\/?\?.*)$/;

describe('Books', () => {
  beforeEach(() => {
    fetchMock.get('/api/books/filterParams', filterParams);
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders a page correctly with default params', async () => {
    fetchMock.get(API_BOOKS_REGEX, booksMock);

    const { container, getAllByText, getAllByAltText, queryByText } = renderWithRouter(<Books />, { route: '/knihy' });
    await waitForDomChange({ container });

    expect(fetchMock.calls()[0][0]).toBe('/api/books');
    expect(getAllByText('Mock book title 1').length).toBe(2);
    expect(getAllByText('Mock book title 2').length).toBe(2);
    expect(getAllByText('Mock author first name 1 Mock author last name 1').length).toBe(2);
    expect(getAllByText('Mock author first name 2 Mock author last name 2').length).toBe(2);
    expect(getAllByText('Tag 1').length).toBe(2);
    expect(getAllByText('Tag 2').length).toBe(2);
    expect(getAllByText('Tag 3').length).toBe(2);
    expect(getAllByText('2019').length).toBe(1);
    expect(getAllByText('1998').length).toBe(1);
    expect(getAllByText('1. 1. 2020').length).toBe(1);
    expect(getAllByText('30. 4. 2019').length).toBe(1);
    expect(getAllByText('(2019)').length).toBe(1);
    expect(getAllByText('(1998)').length).toBe(1);
    expect(getAllByText('Přidáno: 1. 1. 2020').length).toBe(1);
    expect(getAllByText('Přidáno: 30. 4. 2019').length).toBe(1);
    expect(getAllByAltText('Obálka knihy Mock book title 1').length).toBe(2);
    expect(getAllByAltText('Obálka knihy Mock book title 2').length).toBe(2);
    expect(getAllByAltText('Obálka knihy Mock book title 1')[1].getAttribute('src')).toBe(
      'https://loremflickr.com/375/500?random=1'
    );
    expect(getAllByAltText('Obálka knihy Mock book title 2')[1].getAttribute('src')).toBe(
      'https://loremflickr.com/375/500?random=2'
    );
    expect(queryByText('Řazení')).not.toBeInTheDocument();
    expect(queryByText('Vyhledávání')).not.toBeInTheDocument();
  });

  it('opens filter correctly', async () => {
    fetchMock.get(API_BOOKS_REGEX, booksMock);

    const { container, getByText } = renderWithRouter(<Books />, { route: '/knihy' });
    await waitForDomChange({ container });
    fireEvent.click(getByText('Filtr'));

    expect(getByText('Řazení')).toBeInTheDocument();
    expect(getByText('Vyhledávání')).toBeInTheDocument();
  });

  it('displays page correctly for no books', async () => {
    fetchMock.get(API_BOOKS_REGEX, { books: [], total: 0 });

    const { container, getByText } = renderWithRouter(<Books />, { route: '/knihy' });
    await waitForDomChange({ container });

    expect(getByText('Pro zadané parametry nebyla nalezena žádná kniha.')).toBeInTheDocument();
  });

  it('calculates total number of pages correctly', async () => {
    fetchMock.get(API_BOOKS_REGEX, booksMock);

    const { container, getAllByText } = renderWithRouter(<Books />, { route: '/knihy' });
    await waitForDomChange({ container });

    expect(getAllByText('43').length).toBe(2);
  });

  it('calls correct endpoint for order param', async () => {
    fetchMock.get(API_BOOKS_REGEX, booksMock);

    const { container } = renderWithRouter(<Books />, { route: '/knihy?poradi=VZESTUPNE' });
    await waitForDomChange({ container });

    expect(fetchMock.calls()[0][0]).toBe('/api/books?order=ASC');
  });

  it('calls correct endpoint for orderBy param', async () => {
    fetchMock.get(API_BOOKS_REGEX, booksMock);

    const { container } = renderWithRouter(<Books />, { route: '/knihy?seraditPodle=ROK_VYDANI' });
    await waitForDomChange({ container });

    expect(fetchMock.calls()[0][0]).toBe('/api/books?orderBy=YEAR_OF_ISSUE');
  });

  it('calls correct endpoint for page param', async () => {
    fetchMock.get(API_BOOKS_REGEX, booksMock);

    const { container } = renderWithRouter(<Books />, { route: '/knihy?stranka=3' });
    await waitForDomChange({ container });

    expect(fetchMock.calls()[0][0]).toBe('/api/books?page=2');
  });

  it('calls correct endpoint for size param', async () => {
    fetchMock.get(API_BOOKS_REGEX, booksMock);

    const { container } = renderWithRouter(<Books />, { route: '/knihy?knihNaStranku=10' });
    await waitForDomChange({ container });

    expect(fetchMock.calls()[0][0]).toBe('/api/books?size=10');
  });

  it('redirects to book details correctly', async () => {
    fetchMock.get(API_BOOKS_REGEX, booksMock);

    const { container, getAllByText, history } = renderWithRouter(<Books />, { route: '/knihy' });
    await waitForDomChange({ container });

    fireEvent.click(getAllByText('Více informací →')[0]);

    expect(history.location.pathname).toBe('/kniha/mock-book-title-1-2019');
  });

  it('generates title and description correctly for order and orderBy', async () => {
    expect(getTitleAndDescription({ order: 'ASC', orderBy: 'TITLE' }, filterParams)).toMatchObject({
      description: 'Seznam českých LGBT knih seřazených vzestupně podle názvu.',
      title: 'Knihy podle názvu',
    });
  });

  it('generates title and description correctly for one tag', async () => {
    expect(
      getTitleAndDescription({ tags: ['zahranicni'], bookSize: 'kratka', originalLanguage: 'cestina' }, filterParams)
    ).toMatchObject({
      description: 'Seznam českých LGBT knih s tagem Zahraniční seřazených sestupně podle data přidání.',
      title: 'Knihy s tagem Zahraniční',
    });
  });

  it('generates title and description correctly for original language', async () => {
    expect(getTitleAndDescription({ bookSize: 'kratka', originalLanguage: 'cestina' }, filterParams)).toMatchObject({
      description: 'Seznam českých LGBT knih v původním jazyce čeština seřazených sestupně podle data přidání.',
      title: 'Knihy v původním jazyce čeština',
    });
  });

  it('generates title and description correctly for book size', async () => {
    expect(getTitleAndDescription({ bookSize: 'kratka' }, filterParams)).toMatchObject({
      description: 'Seznam českých LGBT knih majících do 100 stran seřazených sestupně podle data přidání.',
      title: 'Knihy mající do 100 stran',
    });
  });
});
