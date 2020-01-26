import useFetch from './useFetch';
import { getBookDetailsUrl } from '../utils/fetchUtils';
import { Book } from './useBooks';

export type BookWithDetails = Book & {
  description: string;
  isbn: string;
  numberOfPages: number;
  originalLanguage: string;
  publisher: string;
  links: {
    cbdb: string;
    goodreads: string;
    databazeKnih: string;
  };
};

const useBook = (slug: string, initialValue?: BookWithDetails): BookWithDetails | undefined =>
  useFetch({
    endpoint: getBookDetailsUrl({ slug }),
    initialValue,
  });

export default useBook;
