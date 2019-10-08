# Fixtures

In the <i>signup-1.integration.spec.js</i> test, every back-end stub has the response set inline, like the `api/users` stub

```javascript
cy.route("POST", "**/api/users", {
  user: {
    username: "Tester",
    email: "user@realworld.io",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2ZhZjc4YTkzNGFiMDRhZjRhMzE0MCIsInVzZXJuYW1lIjoidGVzdGVyNzk1MzYiLCJleHAiOjE1NzM4MzY2ODAsImlhdCI6MTU2ODY0OTA4MH0.zcHxMz2Vx5h-EoiUZlRyUw0z_A_6AIZ0LzQgROvsPqw"
  }
}).as("signup-request");
```

but we can leverage the [Cypress fixtures](https://docs.cypress.io/api/commands/fixture.html) and move the responses out of the test code.

The steps are straightforward:

- create a file in the `cypress/fixtures` directory, ex. `cypress/fixtures/users/signup.json`

- move the above response inside it (transforming it into a valid JSON)

<i>File: cypress/fixtures/users/signup.json</i>
[include](../cypress/fixtures/users/signup.json)

- replace the static response of the code with `"fixture:users/signup"`, Cypress looks for the `users/signup.json` file starting from the `cypress/fixture` directory

```diff
-cy.route("POST", "**/api/users", {
- user: {
-   username: "Tester",
-   email: "user@realworld.io",
-   token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2ZhZjc4YTkzNGFiMDRhZjRhMzE0MCIsInVzZXJuYW1lIjoidGVzdGVyNzk1MzYiLCJleHAiOjE1NzM4MzY2ODAsImlhdCI6MTU2ODY0OTA4MH0.zcHxMz2Vx5h-EoiUZlRyUw0z_A_6AIZ0LzQgROvsPqw"
- }
-).as("signup-request");
+cy.route("POST", "**/api/users", "fixture:users/signup").as("signup-request");
```

- do the same for the `**/api/tags` and `**/api/articles/feed**` stub

<i>File: cypress/fixtures/tags/empty-tags.json</i>
[include](../cypress/fixtures/tags/empty-tags.json)

<i>File: cypress/fixtures/articles/empty-articles.json</i>
[include](../cypress/fixtures/articles/empty-articles.json)

```diff
-cy.route("GET", "**/api/tags", { tags: [] }).as("tags");
-cy.route("GET", "**/api/articles/feed**", { articles: [], articlesCount: 0 }).as("feed");
+cy.route("GET", "**/api/tags", "fixture:tags/empty-tags").as("tags");
+cy.route("GET", "**/api/articles/feed**", "fixture:articles/empty-articles").as("feed");
```

The result is the same but the test code is way cleaner!

<i>File: cypress/integration/examples/signup-integration/signup-2.integration.spec.js</i>
[include](../cypress/integration/examples/signup-integration/signup-2.integration.spec.js)

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
