import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTE } from '../App/routes';
import { routeWithRedirectionParam } from '../utils/urlUtils';

interface UseFetchProps<T> {
  endpoint: string;
  initialValue: T;
}

const useFetch = <T>({ endpoint, initialValue }: UseFetchProps<T>): T => {
  const history = useHistory();
  const [data, setData] = useState<T>(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);

        if (response.status === 404) {
          history.push(routeWithRedirectionParam(ROUTE.ERROR_404));
          return;
        }

        if (response.status !== 200) {
          history.push(routeWithRedirectionParam(ROUTE.ERROR_500));
          return;
        }

        const responseData = await response.json();

        setData(responseData);
      } catch (e) {
        history.push(routeWithRedirectionParam(ROUTE.ERROR_500));
      }
    };
    fetchData();
  }, [endpoint, history]);

  return data;
};

export default useFetch;
