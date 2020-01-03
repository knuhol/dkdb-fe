import { buildUrl } from '../urlUtils';

describe('urlUtils', () => {
  it('builds URL properly', () => {
    expect(
      buildUrl(null, {
        protocol: 'http',
        domain: 'localhost',
        port: 3001,
        uri: 'api',
      })
    ).toBe('http://localhost:3001/api');
    expect(
      buildUrl('/endpoint', {
        protocol: 'https',
        domain: 'localhost',
        port: 3001,
      })
    ).toBe('https://localhost:3001/endpoint');
    expect(
      buildUrl('/endpoint', {
        protocol: 'http',
        domain: 'localhost',
      })
    ).toBe('http://localhost/endpoint');

    expect(() => buildUrl(null, { protocol: 'invalid' })).toThrow();
    expect(() => buildUrl(null, { domain: 1 })).toThrow();
    expect(() => buildUrl(null, { port: 'invalid' })).toThrow();
  });
});
