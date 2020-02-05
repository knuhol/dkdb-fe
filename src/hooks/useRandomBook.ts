import useFetch from './useFetch';
import { getRandomBook } from '../utils/fetchUtils';
import { BookWithDetails } from './useBook';

const useRandomBook = (initialValue?: BookWithDetails): BookWithDetails | undefined =>
  useFetch({
    endpoint: getRandomBook(),
    initialValue,
  });

export default useRandomBook;
