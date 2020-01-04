import { buildBaseUrl } from '../configUtils';

describe('configUtils', () => {
  it('builds base URL properly', () => {
    expect(
      buildBaseUrl(null, {
        protocol: 'http',
        domain: 'localhost',
        port: 3001,
        uri: 'api',
      })
    ).toBe('http://localhost:3001/api');
    expect(
      buildBaseUrl('/endpoint', {
        protocol: 'https',
        domain: 'localhost',
        port: 3001,
      })
    ).toBe('https://localhost:3001/endpoint');
    expect(
      buildBaseUrl('/endpoint', {
        protocol: 'http',
        domain: 'localhost',
      })
    ).toBe('http://localhost/endpoint');
  });
});
