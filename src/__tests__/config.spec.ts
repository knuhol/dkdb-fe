import { API, GA_DEBUG_ENABLED } from '../config';

describe('Configuration', () => {
  it('should have default settings when ENV variables are not defined', () => {
    expect(API).toMatchObject({ domain: 'localhost', protocol: 'http' });
  });

  it('should have GA debug mode disabled', () => {
    expect(GA_DEBUG_ENABLED).toBe(false);
  });
});
