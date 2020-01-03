import { API } from '../config';

const buildUrl = (endpoint, api = API) => {
  const { protocol, domain, port, uri } = api;

  if (protocol !== 'http' && protocol !== 'https') {
    throw new Error('API protocol has to be either http or https');
  }

  if (!domain || typeof domain !== 'string') {
    throw new Error('API domain has to be string');
  }

  if (port && typeof port !== 'number') {
    throw new Error('API port has to be number');
  }

  return `${protocol}://${domain}${port ? ':' + port : ''}${uri ? '/' + uri : ''}${endpoint ? endpoint : ''}`;
};

export { buildUrl };
