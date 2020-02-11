/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const prerender = require('prerender-node');

const PORT = process.env.PORT || 5000;

const app = express();

// force https
app.use((req, res, next) => {
  if (process.env.HEROKU_APP_NAME && req.headers.host === `${process.env.HEROKU_APP_NAME}.herokuapp.com`) {
    return res.redirect(301, process.env.PUBLIC_URL);
  }
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  return next();
});

// prerender.io
app.use(prerender.set('prerenderToken', process.env.PRERENDER_TOKEN));

// serve static files
app.use(express.static(path.resolve(__dirname, '../build')));

// proxy api requests
app.use('/api', proxy({ target: process.env.API_URL, changeOrigin: true }));

// all remaining requests return the React app, so it can handle routing
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});
