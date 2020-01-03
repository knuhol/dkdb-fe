import useFetch from './useFetch';
import { getBookDetailsUrl } from '../utils/fetchUtils';

const useBook = (bookId, initialValue) =>
  useFetch({
    endpoint: getBookDetailsUrl({ id: bookId }),
    initialValue,
  });

export default useBook;
