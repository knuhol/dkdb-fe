/* eslint-disable no-console */

const { SitemapStream, streamToPromise } = require('sitemap');
const path = require('path');
const fs = require('fs');

// TODO: Fetch from API once endpoint is supported
const slugs = require('./slugs');

const sitemap = new SitemapStream({ hostname: process.env.PUBLIC_URL });

sitemap.write({ url: '/', changefreq: 'weekly', priority: 0.7 });
sitemap.write({ url: '/knihy', changefreq: 'weekly', priority: 1 });
slugs.forEach(slug => {
  sitemap.write({ url: `kniha/${slug}`, changefreq: 'yearly', priority: 0.8 });
});
sitemap.write({ url: '/nahodna-kniha', changefreq: 'always', priority: 0.4 });
sitemap.write({ url: '/o-projektu', changefreq: 'yearly', priority: 0.3 });
sitemap.write({ url: '/chyba/404-stranka-nenalezena', changefreq: 'never', priority: 0.1 });
sitemap.write({ url: '/chyba/500-neocekavana-chyba', changefreq: 'never', priority: 0.1 });
sitemap.end();

streamToPromise(sitemap)
  .then(sm => {
    fs.writeFileSync(path.resolve(__dirname, '../build/sitemap.xml'), sm);
    console.log('sitemap.xml successfully generated');
  })
  .catch(console.error);
