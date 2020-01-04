// @flow
import useFetch from './useFetch';
import { getBooksUrl } from '../utils/fetchUtils';

import type { GetBooksParams } from '../utils/fetchUtils';

interface Book {
  id: number;
  title: string;
  author: Array<{
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
    dtabazeKnih: string,
  };
}

const useBooks = (params: GetBooksParams, initialValue?: Book[]): Book[] =>
  useFetch({
    endpoint: getBooksUrl(params),
    initialValue,
  });

export default useBooks;
