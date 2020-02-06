import { useLocation } from 'react-router';
import queryString from 'query-string';

const useSearchParams = () => {
  const { search } = useLocation();

  return queryString.parse(search, { parseNumbers: true });
};

export default useSearchParams;
