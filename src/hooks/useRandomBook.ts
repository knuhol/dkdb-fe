import useFetch from './useFetch';
import { getRandomBookUrl } from '../utils/fetchUtils';
import { BookWithDetails } from './useBook';

const useRandomBook = (initialValue?: BookWithDetails): BookWithDetails | undefined =>
  useFetch({
    endpoint: getRandomBookUrl(),
    initialValue,
  });

export default useRandomBook;
