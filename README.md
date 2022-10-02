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

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7687028-1eb689a5-3c55-40c2-98ae-419a1989a697?action=collection%2Ffork&collection-url=entityId%3D7687028-1eb689a5-3c55-40c2-98ae-419a1989a697%26entityType%3Dcollection%26workspaceId%3D5012cd01-5f66-47f9-82c8-d4475f503b51)

## Authentication and Authorization
- Authentication using jwt Bearer token and [passport js library](https://passportjs.org) 
- Authorization
  - using roles which every user have number of roles identify what can he access
  - every endpoint have guard with roles which can access it

## Database
- I used Typeorm as abstract layer between service and databse which we can change it at any time with nearly effort or code base change
- In this example I used mongoDB as datastore
