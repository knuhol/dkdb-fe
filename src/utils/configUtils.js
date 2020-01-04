import { API } from '../config';

const buildBaseUrl = (endpoint, api = API) => {
  const { protocol, domain, port, uri } = api;

  return `${protocol}://${domain}${port ? ':' + port : ''}${uri ? '/' + uri : ''}${endpoint ? endpoint : ''}`;
};

export { buildBaseUrl };
