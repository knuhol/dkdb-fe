import useFetch from './useFetch';
import { getBookDetailsUrl } from '../utils/fetchUtils';

export type BookWithDetails = {
  slug: string;
  title: string;
  authors: Array<{
    firstName: string;
    lastName: string;
  }>;
  yearOfIssue: number;
  dateOfAddition: string;
  imageURL: string;
  tags: Array<{
    slug: string;
    name: string;
    color: 'RED' | 'ORANGE' | 'BLUE' | 'GREEN' | 'YELLOW' | 'VIOLET';
  }>;
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
