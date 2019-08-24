# What is an E2E test?

TODO: transform it in slides
TODO: add a video of the e2e tests with the realworld app

### Headless browser

An headless browser is a standard web browser without a GUI. You instrument it with some APIs that replicate the user actions (navigating, clicking, typing, etc.) an you can leverage it to automate everything that requires a running browser.

Selenium and Puppeteer are the most used browser automation tools while Cypress, TestCafé, Protractor, etc. leverage the same mechanism with the purpose of testing a webapp.

Let's take a look at what a "browser without GUI" means with the first example using Cypress (we're going to speak later about why we choose Cypress).

[include](../cypress/integration/examples/headless-browser.spec.js)

Cypress is going to run this test, visit the specified page (you need to start the site with `$ npm run realworld:start` in advance) and take a screenshot.

And try to run it through the terminal

```
$ npx cypress run --spec \"cypress/integration/**/headless-browser.*\"
```

what does it do?

- it run [Cypress in headless mode](https://docs.cypress.io/guides/guides/command-line.html#cypress-run) (without a GUI)
- it ask [cypress to run only](https://docs.cypress.io/guides/guides/command-line.html#cypress-run-spec-lt-spec-gt) the test with the filename containing `headless-browser`

For your convenience, you can run directly

```
$ npm run example:headless-browser
```

**End-to-end (E2E) tests**: they run the whole app interacting with the real server. From the user interactions (one of the "end") to the business data (the other "end"): everything must work as designed. E2E tests are typically slow because

- they need a **working back-end** application, typically launched alongside the front-end application. You can't launch them without a server, so you depend on the back-end developers to work
- they need **reliable data**, seeding and cleaning it before every test

That's why E2E tests are not feasible to be used as the only/main test type. They are pretty important because they are testing everything (front-end + back-end) but they must be used carefully to avoid brittle and hour-long test suites.

In a complete suite with a lot of UI Integration tests, you can think about E2E tests as "back-end tests". What flows should you test through them?

- the Happy Path flows: you need to be sure that, at least, the users are able to complete the basic operations
- everything valuable for your business: happy path or not, test whatever your business cares about (prioritizing them, obviously)
- everything that breaks often: weak areas of the system must be monitored too
