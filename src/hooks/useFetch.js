// @flow
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTE, routeWithRedirectionParam } from '../App/routes';

const useFetch = ({ endpoint, initialValue }: { endpoint: string, initialValue: any }) => {
  const history = useHistory();
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);

        if (response.status === 404) {
          history.push(routeWithRedirectionParam(ROUTE.ERROR_404));
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
