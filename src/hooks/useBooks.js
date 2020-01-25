// @flow
import useFetch from './useFetch';
import { getBooksUrl } from '../utils/fetchUtils';

import type { GetBooksParams } from '../utils/fetchUtils';

type Book = {
  slug: string,
  title: string,
  authors: Array<{
    firstName: string,
    lastName: string,
  }>,
  yearOfIssue: number,
  dateOfAddition: string,
  imageURL: string,
  tags: Array<{
    slug: string,
    name: string,
    color: 'RED' | 'ORANGE' | 'BLUE' | 'GREEN' | 'YELLOW' | 'VIOLET',
  }>,
};

const useBooks = (params: GetBooksParams, initialValue?: Book[] = []): Book[] =>
  useFetch({
    endpoint: getBooksUrl(params),
    initialValue,
  });

export default useBooks;
export type { Book };
