# DKDB - Database of Czech LGBT Books (Frontend)

![build](https://img.shields.io/github/workflow/status/knuhol/dkdb-fe/Node%20CI)
&nbsp;
![version](https://img.shields.io/github/package-json/v/knuhol/dkdb-fe)
&nbsp;
![React version](https://img.shields.io/github/package-json/dependency-version/knuhol/dkdb-fe/react?color=%2361DBFB&label=React&logo=React)
&nbsp;
[![commitizen: friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen)](http://commitizen.github.io/cz-cli/)
&nbsp;
[![ESLint](https://img.shields.io/badge/ESLint-supported-blueviolet?logo=eslint)](https://eslint.org/)
&nbsp;
[![Prettier](https://img.shields.io/badge/Prettier-supported-violet)](https://github.com/prettier/prettier)
&nbsp;
[![license](https://img.shields.io/github/license/knuhol/dkdb-fe)](https://github.com/knuhol/dkdb-fe/blob/master/LICENSE)
&nbsp;
![coverage: 70%](https://img.shields.io/badge/coverage-70%25-green)

- [About](#about)
- [Development](#development)
    - [Backend](#backend)
    - [Deployment](#deployment)
    - [Running Locally](#running-locally)
    - [API](#api)
    - [API Mock](#api-mock)
    - [Releases](#releases)
    - [Contribution](#contribution)
- [License](#license)
    
## About
TBD

## Development

### Backend
Backend of this project is written in Java and is located in separate GitHub repo at [dkdb-be](https://github.com/terhol/dkdb-be).

### Deployment
Prod version will be deployed within `*.jar` file on web server. This is going to be handled by backend part of this project so output of the frontend part are just static files which can be downloaded in [Releases](https://github.com/knuhol/dkdb-fe/releases) section.

### Running Locally
Checkout this repo and install dependencies:

```bash
$ npm i
# or
$ yarn
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

This mock server is automatically start together with `npm start` command and is served at `localhost:3001`, example route is [http://localhost:3001/api/books/3](http://localhost:3001/api/books/3).

You can also start the mock API server alone by this command:

```bash
$ npm run mock-api
```

### Releases
Releases are fully automated by GitHub CI. You only need to do this:

1. Run `npm run release` (or `npm run release:release:prerelease` for prerelease) which will bump a version, generate changelog and create git tags.
2. Push the release commit to GitHub with `--follow-tags` flag.

### Contribution
Project uses [commitizen](https://github.com/commitizen/cz-cli) and commit messages check to keep the log align to standards of [Conventional Commits](https://www.conventionalcommits.org). 

Please use this command to make commits:

```bash
$ npm run commit
```

## License
MIT
