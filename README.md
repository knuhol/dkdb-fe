# DKDB - Database of Czech LGBT Books (Frontend)

![build](https://img.shields.io/github/workflow/status/knuhol/dkdb-fe/Node%20CI)
&nbsp;
![version](https://img.shields.io/github/package-json/v/knuhol/dkdb-fe)
&nbsp;
![React version](https://img.shields.io/github/package-json/dependency-version/knuhol/dkdb-fe/react?color=%2361DBFB&label=React&logo=React)
&nbsp;
![TypeScript version](https://img.shields.io/github/package-json/dependency-version/knuhol/dkdb-fe/typescript?color=%23007acc&label=TypeScript&logo=typescript)
&nbsp;
[![commitizen: friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen)](http://commitizen.github.io/cz-cli/)
&nbsp;
[![ESLint](https://img.shields.io/badge/ESLint-supported-blueviolet?logo=eslint)](https://eslint.org/)
&nbsp;
[![Prettier](https://img.shields.io/badge/Prettier-supported-violet?logo=prettier)](https://github.com/prettier/prettier)
&nbsp;
![Coveralls](https://img.shields.io/coveralls/github/knuhol/dkdb-fe?logo=coveralls)
&nbsp;
![Website](https://img.shields.io/website?url=https%3A%2F%2Fdev.dkdb.cz&logo=heroku&label=Heroku)
&nbsp;
[![license](https://img.shields.io/github/license/knuhol/dkdb-fe)](https://github.com/knuhol/dkdb-fe/blob/master/LICENSE)

[https://dkdb.cz](https://dkdb.cz)

## Table of Contents

- [About](#about)
- [Development](#development)
    - [Backend](#backend)
    - [Deployment](#deployment)
        - [Environment Variables](#environment-variables)
    - [Running Locally](#running-locally)
    - [API](#api)
    - [API Mock](#api-mock)
    - [Releases](#releases)
    - [Contribution](#contribution)
- [License](#license)
    
## About
We are LGBT couple Knut and Tereza Holm who have thought that there is no such place on Czech internet where you can find LGBT books in Czech language categorized by its sub genres - so we have created it.

The project is still under heavy development phase but you can find a working version at [https://dev.dkdb.cz](https://dev.dkdb.cz). Please note that the web can be very unstable, which is alright and there is no need to report issues.

## Development

### Backend
Backend of this project is written in Java and is located in separate GitHub repo at [dkdb-be](https://github.com/terhol/dkdb-be).

### Deployment
Prod version is deployed at Heroku with [standard Node.js app buildpack](https://devcenter.heroku.com/articles/nodejs-support). It runs this sequence of commands:
```bash
$ npm install
$ npm run build
$ npm run start:heroku
```

#### Environment Variables
To be able to run app successfully on Heroku, you need to provide several environment variables:
```bash
# URL to instance of this project
$ heroku config:set PUBLIC_URL=https://dkdb.cz

# URL to instance of dkdb-be project
$ heroku config:set API_URL=https://data.dkdb.cz

# name of the current Heroku app
$ heroku config:set HEROKU_APP_NAME=dkdb-fe

# secret for prerender.io
$ heroku config:set PRERENDER_TOKEN=xxx

# Google Analytcs tracking ID
$ heroku config:set REACT_APP_GA_TRACKING_ID=xxx
```

### Running Locally
Checkout this repo and install dependencies:

```bash
$ npm i
```

To start dev server with api-mock run this command:

```bash
$ npm start
```

Project is served at [http://localhost:3000](http://localhost:3000).

You can also start just the dev server alone by this command:

```bash
$ npm run dev-server
```

### API 
Full API documentation is available in [dkdb-be](https://github.com/terhol/dkdb-be#rest-api-documentation) project doc.

### API Mock
There is a mock API for development purposes which offers all routes supported by official API.

This mock server is automatically start together with `npm start` command and is served at `localhost:3001`, example route is [http://localhost:3001/api/books](http://localhost:3001/api/books).

You can also start the mock API server alone by this command:

```bash
$ npm run mock-api
```

### Releases
Releases are fully automated by GitHub CI. You only need to do this:

1. Run `npm run release` (or `npm run release:prerelease` for pre-release) which will bump a version, generate changelog and create git tags.
2. Push the release commit to GitHub with `--follow-tags` flag.

### Contribution
Project uses [commitizen](https://github.com/commitizen/cz-cli) and commit messages check to keep the log align to standards of [Conventional Commits](https://www.conventionalcommits.org). 

Please use this command to make commits:

```bash
$ npm run commit
```

## License
MIT
