// @flow
import useFetch from './useFetch';
import { getBookDetailsUrl } from '../utils/fetchUtils';

interface BookWithDetails {
  id: number;
  title: string;
  authors: Array<{
    firstName: string,
    lastName: string,
  }>;
  yearOfIssue: number;
  dateOfAddition: string;
  imageURL: string;
  tags: Array<{
    id: number,
    name: string,
  }>;
  description: string;
  ISBN: string;
  numberOfPages: number;
  originalLanguage: string;
  publisher: string;
  links: {
    cbdb: string,
    goodreads: string,
    databazeKnih: string,
  };
}

const useBook = (bookId: number, initialValue?: BookWithDetails): BookWithDetails =>
  useFetch({
    endpoint: getBookDetailsUrl({ id: bookId }),
    initialValue,
  });

export default useBook;
export type { BookWithDetails };
