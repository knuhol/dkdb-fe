import useFetch from './useFetch';
import { getBooksInfoUrl } from '../utils/fetchUtils';

type Info = {
  totalBooks: number;
  dateOfLastBookAddition: string;
};

const useBooksInfo = (initialValue?: Info): Info | undefined =>
  useFetch({
    endpoint: getBooksInfoUrl(),
    initialValue,
  });

export default useBooksInfo;
