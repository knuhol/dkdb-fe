import useFetch from './useFetch';
import { getBooksUrl } from '../utils/fetchUtils';

const useBook = ({ order, orderBy, from, to } = {}, initialValue) =>
  useFetch({
    endpoint: getBooksUrl({ order, orderBy, from, to }),
    initialValue,
  });

export default useBook;
