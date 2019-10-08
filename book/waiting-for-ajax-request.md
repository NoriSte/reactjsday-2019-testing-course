# Waiting for an AJAX request

Do you remember the [list of problems](utility-in-case-of-failure.md#error-feedback) that could make the signup flow break? We "fixed" the DOM-related ones by retrieving the elements based on the contents instead of the order, but there were **a lot of problems related to the AJAX request** itself. They were the following ones:

- the AJAX call does not start

- the AJAX call has the wrong request payload

- the API does not work and it does not respond

- the API returns the wrong payload

- the user already exists

The test still does not help us with these errors. When it fails, we need to spend some time debugging what's happening in the web app (while it's under test) to discover that the issue was related to a wrong AJAX request... Do not despair, Cypress is here to improve the E2E testing experience!

### Server contract

When we test the front-end of our web app, we need to consider it a closed block (blackbox testing) and we need to check **how it interacts with the external world**. We need to test the contracts between the front-end and all the involved entities. What are the contracts to be respected by the front-end app?

- functional contract with the user

- presentational contract with the user

- contract with the server

The first one is the subject of the all the E2E tests, the second one is the subject for the [visual regression tests](visual-regression-testing.md), but we need to concentrate on the last one. A lot of times the front-end stops working because of a misaligned communication with the back-end.

### AJAX request waiting

If we know that an AJAX request happens systematically (it is going to happen every time) we need to consider it in our Cypress test. The signup flow is a good example. We are going to see what are the APIs that allow us to do that.

First of all, we need to set up AJAX call interception:

```diff
it("The happy path should work", () => {
+ cy.server();
+ cy.route("POST", "**/api/users");

  cy.visit(paths.register);
  // the rest of the test code
});
```

- [`cy.server()`](https://docs.cypress.io/api/commands/server.html) tells Cypress to act as a proxy, intercepting and allowing to wait for AJAX requests

- [`cy.route`](https://docs.cypress.io/api/commands/route.html) tells Cypress to intercept some AJAX requests. We can use [a lot of options](https://docs.cypress.io/api/commands/route.html#Arguments) to match precisely which AJAX request we want to intercept. `cy.route("POST", "**/api/users")` tells Cypress to intercept every `POST` request to every URL that ends with `**/api/users` (the signup form makes a request to the `http://localhost:3100/api/users`, Cypress uses [minimatch](https://github.com/isaacs/minimatch) to take advantage of \* and \*\* glob support).

Second: we need to set a [Cypress alias](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html) to reference it later on

```diff
it("The happy path should work", () => {
  cy.server();
  cy.route("POST", "**/api/users")
+   .as("signup-request");

  cy.visit(paths.register);
  // the rest of the test code
});
```

Third: we must "wait" the AJAX request triggered by the front-end app

```diff
it("The happy path should work", () => {
  cy.server();
  cy.route("POST", "**/api/users")
    .as("signup-request");
  cy.visit(paths.register);
  // form filling code
  cy.get("form")
    .within(() => cy.findByText(strings.signUp))
    .click();
+ cy.wait("@signup-request");
  cy.findByText(noArticles, { timeout: 10000 }).should("be.visible");
});
```

What does "waiting" main for an AJAX request? Here we can see the advantages of automatic Cypress waitings mixed with AJAX requests management! By asking Cypress to `cy.wait("@signup-request");`, it's going to **wait up to 5 seconds for the front-end to start the request and up to 30 seconds for the back-end** to fulfill the request (both of the timeouts are customizable).

Last change: do you remember why did we add the custom timeout to the `cy.findByText(noArticles, { timeout: 10000 })` call? We added it while speaking about the [stability](e2e-test-defects-stability.md) of the test because we faced the problem that `cy.contain` (later replaced by `cy.findByText`) sometimes failed because the AJAX request took too long (and the default `cy.contain`/`cy.findByText` timeout is 4000 milliseconds). Now we do not need it anymore because the `cy.wait` knows that an AJAX request could take a really long time!

```diff
- cy.findByText(noArticles, { timeout: 10000 }).should("be.visible");
+ cy.findByText(noArticles).should("be.visible");
```

That's all the changes we applied to the test

```diff
it("The happy path should work", () => {
+ cy.server();
+ cy.route("POST", "**/api/users")
+   .as("signup-request");
  cy.visit(paths.register);
  const random = Math.floor(Math.random() * 100000);
  cy.findByPlaceholderText(strings.username).type(`Tester${random}`);
  cy.findByPlaceholderText(strings.email).type(`user+${random}@realworld.io`);
  cy.findByPlaceholderText(strings.password).type("mysupersecretpassword");
  cy.get("form")
    .within(() => cy.findByText(strings.signUp))
    .click();
+ cy.wait("@signup-request");
- cy.findByText(noArticles, { timeout: 10000 }).should("be.visible");
+ cy.findByText(noArticles).should("be.visible");
});
```

and that's the test with some comments

<i>File: cypress/integration/examples/signup/signup-6-ajax-request-waiting.e2e.spec.js</i>
[include](../cypress/integration/examples/signup/signup-6-ajax-request-waiting.e2e.spec.js)

The test is now way more robust because

- we do not wait only for something that "reflects" the result of the AJAX request (the "_No articles are here_" string) but for the AJAX request itself

- we do not wait up to a "random" (the previous `{timeout: 10000}`) amount of time but up to a longer time. **10 seconds could not be enough** (if you have ever consumed some AWS Lambdas you know what I'm talking about) because of the back-end wakeup/caching times

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
