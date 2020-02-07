import { useLocation } from 'react-router';

const useQuery = () => {
  const { search } = useLocation();

  return new URLSearchParams(search);
};

export default useQuery;
