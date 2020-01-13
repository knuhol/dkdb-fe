// @flow
import { API } from '../config';
import type { ApiConfig } from '../config';

const buildBaseUrl = (endpoint: string, api: ApiConfig = API) => {
  const { protocol, domain, port, uri } = api;

  return `${protocol}://${domain}${port ? `:${port}` : ''}${uri ? `/${uri}` : ''}${endpoint || ''}`;
};

export { buildBaseUrl };
