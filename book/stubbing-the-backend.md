# Stubbing the back-end

What's the matter with **E2E tests**? Well, they:

- are** slow**: in the previous chapter we dedicated a lot of attention to reduce the test duration but we three/four/five seconds are still too much. It's not a good result because we run just a few tests but a front-end application requires a lot more tests

- do not allow the front-ender to work without a back-ender: this is a huge limit. We all know that we can not count on all the infrastructure 24/7, nor on our devops/back-end colleagues. Often, the front-end development and the back-end one do not proceed side by side either

- they make **edge cases replication hard**: if we work with real data, we are going to spend most of the time dealing with it with a 20-40% of the time remaining for the front-end tests themselves

So: **E2E tests are not feasible for front-end testing**. They are important, obviously, but we cannot rely on them too much. That's the reason why E2E testing is at the top of the [testing pyramid](types-of-test.md#testing-pyramid), they give you the most amount of confidence but they are super expensive in terms of writing, maintenance, and stability.

Going down with the [testing pyramid](types-of-test.md#testing-pyramid) we can find the integration tests, a kind of tests where a part of the application is tested, a middle ground between E2E testing (whole front-end+back-end app) and unit testing (single unit/module test). Cypress allows us to write "one more" type of test easily: **UI Integration Tests**. The goal is to test the whole front-end app but without a real back-end. All the **AJAX requests are stubbed with static responses**. The main advantages are:

- extreme speed: Cypress respond to the front-end AJAX requests in hundredths of a second

- front-end testing independence: we test the front-end while developing the front-end, we are no more tied to the back-end so we do not need to delay the front-end testing anymore

- testing confidence: testing the whole front-end in a browser gives you more and more confidence than a JSDom test with the terminal

- edge cases replication: with static responses, you can simulate (or reproduce, if you're analyzing a bug) every edge case in a while

Pleas note an important terminology difference:

- a stub is a static response used to "replace" the server one

- a mock is a simplified, yet working, version of the back-end. It has the same APIs (from a front-end perspective) but with the minimun complexity neede to simulate the real back-end functionalities

### Implementing the first UI Integration test

Until now, we have tested the registration flow and we have written a custom command to allow every test to consume the front-end with an authenticated user. We are going to analyze the signup flow firstly.

The state of the art of our E2E signup flow is the following:

<i>File: cypress/integration/examples/signup/signup-8-simpler-assertions.e2e.spec.js</i>
[include](../cypress/integration/examples/signup/signup-8-simpler-assertions.e2e.spec.js)

now, we need to transform it into a UI Integration test, the steps are:

- we do not need a random user anymore. We randomized the user data to improve the [test determinism](e2e-test-defects-determinism.md) and to avoid to register the same user twice

```diff
-const random = Math.floor(Math.random() * 100000);
const user = {
- username: `Tester${random}`,
+ username: "Tester",
- email: `user+${random}@realworld.io`,
+ email: "user@realworld.io",
  password: "mysupersecretpassword"
};
```

- we need to instrument Cypress to intercept every AJAX request and respond with a static response. We use another feature of the `cy.route` command, introduced with the [Waiting for an AJAX request](waiting-for-ajax-request.md) chapter: passing a response

```diff
-cy.route("POST", "**/api/users").as("signup-request");
+cy.route("POST", "**/api/users", {
+ user: {
+   username: "Tester",
+   email: "user@realworld.io",
+   token:
+     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2ZhZjc4YTkzNGFiMDRhZjRhMzE0MCIsInVzZXJuYW1lIjoidGVzdGVyNzk1MzYiLCJleHAiOjE1NzM4MzY2ODAsImlhdCI6MTU2ODY0OTA4MH0.zcHxMz2Vx5h-EoiUZlRyUw0z_A_6AIZ0LzQgROvsPqw"
+ }
+}).as("signup-request");
```

where does the `{user: {...}}` response come from? From inspecting the response of the back-end to the `POST` JAJAX call to the `/api/users` API
<img src="../assets/images/signup-call-response.png" alt="The signup call response"/>

- we need to stub (the process of intercepting and responding with static data) even more AJAX calls because, once the signup flow is complete, the home page calls some more APIs to populate the page.

<div>
    <img src="../assets/images/integration-test-error.jpg" alt="Front-end error" style="width: 100%; margin-left: auto; margin-right: auto;" class="img-border"/>
</div>
<br />
The test Runner helps us a lot identifying the unstubbed AJAX calls

<div>
    <img src="../assets/images/test-runner-ajax-requests.png" alt="Unstubbed AJAX calls" style="width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;" class="img-border"/>
</div>
<br />

as you can see:

- the first AJAX call is a `POST` to `/api/users`, it's stubbed and the alias is `signup-request`
- the second AJAX call is a `GET` to `/api/tags` and it's unstubbed (it hits the back-end application)
- the third AJAX call is a `GET` to `/api/articles/feed` and it's unstubbed

The Test Runner is a precious ally while trying to understand why the front-end behaves an unexpected way...

We can stub both the second and the third AJAX calls with

```javascript
cy.route("GET", "**/api/tags", { tags: [] }).as("tags");
cy.route("GET", "**/api/articles/feed**", {
  articles: [],
  articlesCount: 0
}).as("feed");
```

- we do not need to check the AJAX response payload anymore (since it's Cypress that responds in place of the back-end app)

```diff
-expect(xhr.status).to.equal(200);

-cy.wrap(xhr.response.body)
- .should("have.property", "user")
- .and(
-   user =>
-     expect(user)
-       .to.have.property("token")
-       .and.to.be.a("string").and.not.to.be.empty
- )
- .and("deep.include", {
-   username: user.username.toLowerCase(),
-   email: user.email
- });
```

- we should wait for the two AJAX calls

```diff
cy.wait("@signup-request")
.should(xhr =>
  expect(xhr.request.body).deep.equal({
    user: {
      username: user.username,
      email: user.email,
      password: user.password
    }
  })
)
+.wait(["@tags", "@feed"]);
```

And we're done! You can take a look at the whole test and run it, it's the
<i>cypress/integration/examples/signup-integration/signup-1.integration.spec.js file</i>
[include](../cypress/integration/examples/signup-integration/signup-1.integration.spec.js)

The most astonishing result is the speed of the test 😱

<div>
    <img src="../assets/images/integration-test-performance.png" alt="Integration test performance" style="width: 100%; margin-left: auto; margin-right: auto;" class="img-border"/>
</div>
<br />

Why should we test the request payload in the UI Integration Tests too? Leveraging the fact that the requests do not hit the back-end, we are going to use this kind of tests for a lot of different paths. Some of these paths will not have a corresponding E2E test because they would be too much expensive. Since **request payloads are super important**, we can not think to check only the ones included in an E2E test.

A good case to think about is a searchable list, we are going to have probably ten/twenty UI Integration tests (with different request payloads) for it but just two or three E2E tests.

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
