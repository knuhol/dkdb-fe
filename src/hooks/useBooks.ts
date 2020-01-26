import useFetch from './useFetch';
import { getBooksUrl, GetBooksParams } from '../utils/fetchUtils';

export type Book = {
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
};

const useBooks = (params: GetBooksParams, initialValue: Book[] = []): Book[] =>
  useFetch({
    endpoint: getBooksUrl(params),
    initialValue,
  });

export default useBooks;
