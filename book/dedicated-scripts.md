# Dedicated scripts

If you respect a naming convention like the one [proposed earlier](opening-cypress.md) that was something like `cypress/integration/<DIRECTORY>/<SUBJECT>.<TYPEOFTEST>.spec.js` (where TYPEOFTEST is `integration`, `e2e`, etc.) is easy to create dedicated scripts for each kind of tests.

It could be helpful even **for other members of the team**: imagine a back-ender that is going to release an update and want to run just the E2E tests locally to be sure that everything works as expected, a `npm run tests:e2e` script could be helpful for him. Something like the following script

```json
"scripts": {
  "tests:e2e": "cypress run --spec \"cypress/integration/**/*.e2e.*\""
}
```

can launch just the E2E tests. Otherwise, you can use the [cypress-select-tests](https://github.com/bahmutov/cypress-select-tests) plugin to select the tests an easier way (`cypress run --env fgrep=e2e`) or run only the tests with a particular title (`cypress run --env grep='E2E'`)

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
