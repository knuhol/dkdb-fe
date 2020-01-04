// @flow
import useFetch from './useFetch';
import { getBookDetailsUrl } from '../utils/fetchUtils';

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
}

const useBook = (bookId: number, initialValue?: Book): Book =>
  useFetch({
    endpoint: getBookDetailsUrl({ id: bookId }),
    initialValue,
  });

export default useBook;
