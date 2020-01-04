// @flow
import useFetch from './useFetch';
import { getTotalBooksUrl } from '../utils/fetchUtils';

const useBook = (initialValue?: number): number => {
  const totalData = useFetch({
    endpoint: getTotalBooksUrl(),
    initialValue,
  });

  return totalData.total;
};

export default useBook;
