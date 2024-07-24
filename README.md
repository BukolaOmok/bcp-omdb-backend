# Intermediate starter for _javascript_ express APIs.

Jira Link - https://bcp-omdb-fullstack-project.atlassian.net/jira/software/projects/KAN/boards/1

This is an intermediate starter template for node.js API apps written in JavaScript (not TypeScript) using Express.

It does not use express router, though you are free to make use of that.

## Configuration on dev machine

Copy `.env.example` to `.env` and set any variables there appropriately:

-   `DATABASE_URL` to your database's connection string.

If you are not using a database, change server.js to remove any import of the `support/db.js` module.

## Configuration on production environment

If you using a DB for this API, set the `DATABASE_URL` environment variable (e.g. on render.com this is done through the UI under settings/environment).

## Change this README.md file!

If you have used this project as a template, remember to change this readme file to add your own documentation and remove anything you don't need.

## Features

-   Database support:

    -   connection-pool setup for [node-postgres](https://node-postgres.com/)
    -   loads `DATABASE_URL` from env variable. (And tries to load `.env` files with `dotenv`)

-   automated testing with vitest
    -   example test
-   formatting with prettier
-   linting with eslint
-   workflow config for CI on github (see [.github/workflows/ci-for-node.yaml](.github/workflows/ci-for-node.yaml) )
-   jsconfig.json (to enable vscode error-reporting in type-checked js files)
-   .gitignore
-   logging with [morgan](https://expressjs.com/en/resources/middleware/morgan.html)
-   simplest demo of input validation with [zod](https://zod.dev/)

## Installation

Install dependencies

`yarn`

## Running

In dev mode

```bash
yarn dev
```

Running in production

```bash
yarn start
```

## Running tests

```bash
yarn test
```

## Linting

```bash
yarn lint
```

## Formatting with prettier

```bash
yarn format
```

However, it is suggested you install vscode's prettier extension and enable the user setting `format on save`. When formatting, VSCode will notice the .prettierrc and format according to those rules (and prettier's defaults).

## checking linting, formatting, and tests together

```bash
yarn check-all
```

## CI (linting, formatting check, automated tests)

This project includes a workflow file in [.github](.github) which will cause CI to run on github.

## Debugging with vscode

Set a breakpoint in the margin of any JS file, and use run-and-debug (ctrl-shift-d)'s `Run and Debug` button to start express. Bear in mind that a breakpoint set in a request handler won't cause express to pause until a matching request comes in!

## Documenting your API

An simple example swagger document can be found in `openapi-docs/openapi.json`.

If you don't need it, it can be safely deleted.

[A more thorough example repo](https://github.com/nbogie/demo-express-api-with-swagger-jsdoc-and-ui/) is available and recommended for those wanting to learn how to maintain and serve documentation alongside their API.

## Getting started coding

-   [Flavio Copes' Express Handbook](https://www.freecodecamp.org/news/the-express-handbook/)
