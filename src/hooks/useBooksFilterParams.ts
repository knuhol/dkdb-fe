import useFetch from './useFetch';
import { getBooksFilterParamsUrl } from '../utils/fetchUtils';

export type BooksFilterParams = {
  originalLanguage: Array<{
    booksMatchesValue: number;
    slug: string;
    name: string;
  }>;
  bookSize: Array<{
    booksMatchesValue: number;
    slug: string;
    name: string;
    minPages: number | null;
    maxPages: number | null;
  }>;
  tags: Array<{
    booksMatchesValue: number;
    slug: string;
    name: string;
  }>;
};

const useBooksFilterParams = (initialValue?: BooksFilterParams): BooksFilterParams | undefined =>
  useFetch({
    endpoint: getBooksFilterParamsUrl(),
    initialValue,
  });

export default useBooksFilterParams;
