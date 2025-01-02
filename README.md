# cypress-simulator

[![CI/CD](https://github.com/wlsf82/cypress-simulator/actions/workflows/cicd.yml/badge.svg)](https://github.com/wlsf82/cypress-simulator/actions)

Explore and experiment with Cypress commands in real-time!

## Business rules 🕴️

Read the following [doc](./docs/REQUIREMENTS.md) to understand all the Cypress Simulator application's functionalities.

## Pre-requisites 📋

To clone and run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.42.1` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v22.12.0` while writing this doc)
- npm (I've used version `11.0.0` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed too.

## Starting the app 💻

To start the app, simply open the `./src/index.html` file in your preferred web browser.

## Installation of `devDependencies`

The `devDependencies` need to be installed to run the static analysis and tests.

To do so, after cloning the project, open a terminal, go to the repo's root, and run `npm install` (or `npm i`, for short.)

### Static analysis 🔎

This project is configured with [ESLint](https://eslint.org/) rules.

To run ESLint, simply run the `npm run lint` command.

To auto-fix breaking linting rules, run the `npm run lint:fix` command.

### Tests 🧪

This project has end-to-end and accessibility (a11y) tests written with [Cypress](https://cypress.io/) and [cypress-axe](https://www.npmjs.com/package/cypress-axe).

To run them , simply run the `npm test` command (or `npm t`, for short.)

To run tests in interactive mode, run the `npm run cy:open` command.

## Support this project

To support this project, leave it a star on GitHub. ⭐

___

Made with 🩵 by [Walmyr](https://walmyr.dev).
