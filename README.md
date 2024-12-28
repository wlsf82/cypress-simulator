# cypress-simulator

[![CI/CD](https://github.com/wlsf82/cypress-simulator/actions/workflows/cicd.yml/badge.svg)](https://github.com/wlsf82/cypress-simulator/actions)

Explore and experiment with Cypress commands in real-time!

## Business rules 🕴️

Read the following [doc](./docs/REQUIREMENTS.md) to understand all the Cypress Simulator application's functionalities.

## Pre-requirements 📋

To clone and run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.42.1` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v22.11.0` while writing this doc)
- npm (I've used version `10.9.0` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed too.

## Starting the app 💻

To start the app, simply open the `./src/index.html` file in your preferred web browser.

## Installation of `devDependencies`

After cloning this project, to install the dev dependencies, open a terminal, go to the root of this repo, and run `npm install` (or `npm i`, for short.)

## Static Analisys 🔎

This project is configured with [ESLint](https://eslint.org/) rules.

To run ESLint, simply run `npm run lint`.

To auto-fix breaking linting rules, run `npm run lint:fix`.

## Tests 🧪

This project has end-to-end tests written with [Cypress](https://cypress.io/).

To run them , simply run `npm test` (or `npm t`, for short.)

To run tests in interactive mode, run `npm run cy:open`.

## Support this project

To support this project, simply leave it a star on GitHub. ⭐

___

Made with 🩵 by [Walmyr](https://walmyr.dev).
