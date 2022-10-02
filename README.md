## Description
This project based on nest.js framework
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Postman Collection
[Collection Link](https://postman.com/collections/60cff4fe3065ccb88e60)

## Authentication and Authorization
- Authentication using jwt Bearer token and [passport js library](https://passportjs.org) 
- Authorization
  - using roles which every user have number of roles identify what can he access
  - every endpoint have guard with roles which can access it


