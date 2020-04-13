export type ApiConfig = {
  protocol: string;
  domain: string;
  port?: string | null;
  uri?: string | null;
};

const API: ApiConfig = {
  protocol: process.env.REACT_APP_PROTOCOL || 'http',
  domain: process.env.REACT_APP_DOMAIN || 'localhost',
  port: process.env.REACT_APP_PORT,
  uri: process.env.REACT_APP_URI,
};

const GA_DEBUG_ALLOWED = false;

export { API, GA_DEBUG_ALLOWED };
