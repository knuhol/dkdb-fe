// @flow
import useFetch from './useFetch';
import { getTotalBooksUrl } from '../utils/fetchUtils';

const useBook = (initialValue?: number = 0): number => {
  const totalData = useFetch({
    endpoint: getTotalBooksUrl(),
    initialValue,
  });

  return totalData.total;
};

export default useBook;
