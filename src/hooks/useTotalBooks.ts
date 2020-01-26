import useFetch from './useFetch';
import { getTotalBooksUrl } from '../utils/fetchUtils';

type Total = {
  total: number;
};

const useBook = (initialValue = 0): number => {
  const totalData: { total: number } = useFetch<Total>({
    endpoint: getTotalBooksUrl(),
    initialValue: { total: initialValue },
  });

  return totalData.total;
};

export default useBook;
