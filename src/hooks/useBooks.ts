import mapKeys from 'lodash/mapKeys';

import useFetch from './useFetch';
import { GetBooksParams, getBooksUrl } from '../utils/fetchUtils';
import { BooksParams } from '../utils/urlUtils';

export type Tag = {
  slug: string;
  name: string;
  color: 'red' | 'orange' | 'blue' | 'green' | 'yellow' | 'purple';
};

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
  tags: Array<Tag>;
};

type Books = {
  total: number;
  books: Book[];
};

const useBooks = (params: BooksParams, initialValue?: Books): Books | undefined => {
  const getBooksParams: GetBooksParams = mapKeys(params, (value, key) => {
    if (key === 'pageSize') {
      return 'size';
    }
    return key;
  });

  if (getBooksParams.page) {
    getBooksParams.page -= 1;
  }

  return useFetch({
    endpoint: getBooksUrl(getBooksParams),
    initialValue,
  });
};

export default useBooks;
