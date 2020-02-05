import React from 'react';
import fetchMock from 'fetch-mock';
import { waitForDomChange, fireEvent } from '@testing-library/react';
import { Route } from 'react-router-dom';

import BookBySlug from '../index';
import { PREVIOUS_ROUTE, renderWithRouter } from '../../../utils/testUtils';
import { ROUTE } from '../../routes';

import bookMock from '../__mocks__/book.json';
import bookNoLinksMock from '../__mocks__/book-no-links.json';

describe('BookBySlug', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders a page correctly', async () => {
    fetchMock.get('/api/books/mock-book-title-1-1959', bookMock);

    const { container, getByText, getByAltText } = renderWithRouter(
      <Route path={ROUTE.BOOK_BY_SLUG}>
        <BookBySlug />
      </Route>,
      { route: '/kniha/mock-book-title-1-1959' }
    );
    await waitForDomChange({ container });

    expect(getByText('Mock book title 1')).toBeInTheDocument();
    expect(getByText('Mock author first name 1 Mock author last name 1')).toBeInTheDocument();
    expect(getByText('Rok vydání: 1959')).toBeInTheDocument();
    expect(getByText('Přidáno: 16. 3. 2018')).toBeInTheDocument();
    expect(getByText('ISBN: c46001f0-d500-4f2a-b7f8-3dd9ad2d2f88')).toBeInTheDocument();
    expect(getByText('Originální jazyk: mock language')).toBeInTheDocument();
    expect(getByText('Suscipit ea exercitationem qui quidem deserunt aspernatur cumque.')).toBeInTheDocument();
    expect(getByText('Vydavatel: Mock publisher 1')).toBeInTheDocument();
    expect(getByText('Tag 1')).toBeInTheDocument();
    expect(getByText('Tag 2')).toBeInTheDocument();
    expect(getByText('Goodreads').getAttribute('href')).toBe('https://www.goodreads.com/57034');
    expect(getByText('ČBDB').getAttribute('href')).toBe('https://cbdb.cz/81679');
    expect(getByText('Databáze knih').getAttribute('href')).toBe('https://databazeknih.cz/31337');
    expect(getByAltText('Obálka knihy Mock book title 1').getAttribute('src')).toBe(
      'https://loremflickr.com/375/500?random=56'
    );
  });

  it('renders a page correctly when a book has no links', async () => {
    fetchMock.get('/api/books/mock-book-title-1-1959', bookNoLinksMock);

    const { container, getByText } = renderWithRouter(
      <Route path={ROUTE.BOOK_BY_SLUG}>
        <BookBySlug />
      </Route>,
      { route: '/kniha/mock-book-title-1-1959' }
    );
    await waitForDomChange({ container });

    expect(getByText('Goodreads').getAttribute('href')).toBe('/#');
    expect(getByText('ČBDB').getAttribute('href')).toBe('/#');
    expect(getByText('Databáze knih').getAttribute('href')).toBe('/#');
  });

  it('returns back correctly', async () => {
    fetchMock.get('/api/books/mock-book-title-1-1959', bookMock);

    const { container, getByText, history } = renderWithRouter(
      <Route path={ROUTE.BOOK_BY_SLUG}>
        <BookBySlug />
      </Route>,
      { route: '/kniha/mock-book-title-1-1959' }
    );
    await waitForDomChange({ container });

    fireEvent.click(getByText('← Zpátky na přehled'));

    expect(history.location.pathname).toBe(PREVIOUS_ROUTE);
  });
});
