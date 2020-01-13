// @flow
interface ApiConfig {
  protocol: string;
  domain: string;
  port: number;
  uri?: string;
}

const API: ApiConfig = {
  protocol: 'http',
  domain: 'localhost',
  port: 3001,
  uri: 'api',
};

export { API };
export type { ApiConfig };
