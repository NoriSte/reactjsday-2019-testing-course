# Interacting with the page

Let's start with a real Cypress test:

<i>File: <a href="../cypress/integration/examples/signup/signup-1.e2e.spec.js" target="_blank">cypress/integration/examples/signup/signup-1.e2e.spec.js</a></i>
[include](../cypress/integration/examples/signup/signup-1.e2e.spec.js)

A closer look line by line:

- `/// <reference types="Cypress" />` allows us to leverage [VS Code Intellisense](https://code.visualstudio.com/docs/editor/intellisense) for the autocompletion
  <img src="../assets/gifs/reference-types-cypress.gif" alt="VSCode Intellisense"/>

- `context("...` is the same of `describe("...`, it helps grouping some related tests

- `it("...` is the same of `test("...`, it contains the test instructions

- about the name of the file (`signup-1.e2e.spec.js`):
  - `xxx.spec.js` (or `xxx.test.js`, it's the same) helps identifying in a while the purpose of the test
  - `xxx.e2e.xxx` helps identifying the type of the test, it allows you to run only some kind of tests with a single command (ex. `npx cypress run --spec \"cypress/integration/**/*.e2e.*\"`)

TODO: to be continued

---

The signup page (here the [local one](http://localhost:4100/register) and the [online hosted one](https://react-redux.realworld.io/#/register)) has a
