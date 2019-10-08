# Custom commands

At least half of the [RealWorld](the-realworld-project.md) features require the user to be authenticated. By default, Cypress forces you [to not share the state between the tests](https://docs.cypress.io/guides/references/best-practices.html#Having-tests-rely-on-the-state-of-previous-tests) and it makes sense because it's a huge anti-pattern. We need to transform the signup process into something usable by every test: a [Cypress custom command](https://docs.cypress.io/api/cypress-api/custom-commands.html).

A Cypress Custom Command is a function that can be called from the global `cy` object. We are going to create a `cy.signupV1()` command to be run before every other test.

The steps needed to create a new Cypress custom command are the next:

- create a new file containing the code of the command itself into the `cypress/support` directory. The file is the `cypress/support/signup/signup-v1.js`

- add the wrapper of the code

```javascript
Cypress.Commands.add("signupV1", (/* the params of the command */) => {
  /* the code of the command */
});
```

- import the newly created file from the `cypress/support/commands.js` file

```javascript
import "./signup/signup-v1";
```

- start writing a new test that calls the `cy.signupV1()` command

```javascript
context("Whatever test", () => {
  it("Should leverage the custom registration command", () => {
    cy.signupV1();
  });
});
```

- run the test!

Obviously, the new command does nothing at the moment, but this is the foundation of `cy.signupV1` command.

### First signup command

The first implementation is simple and not very smart, the core of the command is the same of the
<i>signup-8-simpler-assertions.e2e.spec.js</i> test.

While creating reusable commands, the [testing rules](testing-rules.md#simple) remain the same. The most important ones for our exercise are:

- the commands must be as simple as possible

- the commands must be flexible and easily customizable

The former is respected because we are going to copy all the code from the just written <i>signup-8-simpler-assertions.e2e.spec.js</i> test. The latter leads us to ask a question: what could be changed with a global and reusable signup utility? Essentially, only the user data.

The command must accept the user data with the usual defaults if not provided

```javascript
Cypress.Commands.add("signupV1", ({ email, username, password } = {}) => {
  const random = Math.floor(Math.random() * 100000);
  const user = {
    username: username || `Tester${random}`,
    email: email || `user+${random}@realworld.io`,
    password: password || "mysupersecretpassword"
  };

  // The rest of the code...
});
```

The rest of the code is 100% the same of the <i>signup-8-simpler-assertions.e2e.spec.js</i> test, the only changes are placed in the end:

- a `cy.server({ enable: false });` to restore the original `cy.server` behavior

- a closing `cy.then(() => user);` so the data used to register the user can be consumed by chaining a command to the `cy.signupV1()` call

The whole code is the following:

<i>File: cypress/support/signup/signup-v1.js</i>
[include](../cypress/support/signup/signup-v1.js)

and the test that leverages the custom command is:

```javascript
context("Whatever test", () => {
  it("Should leverage the custom registration command", () => {
    cy.signupV1();
    cy.log("The user is now registered and authanticated");
    cy.findByText("New Post").should("be.visible");
  });
});
```

Please note that the new command is not a replacement for the signup tests. It allows other tests to leverage the same result but, even if they share (at the moment) almost 99% of the code, they are separated.

The `cy.signupV1()` command could be consumed:

- calling it before your code

- calling it from a `before`/`beforeEach` test hook, a function that is called before all the tests (`before`) or before every test (`beforeEach`)

and:

- with the default user data creation: `cy.signupV1()`

- with custom data: `cy.signupV1({email: "foo@bar.io", username: "foo", password: "bar"})`

You can find all the combinations of them into a dedicated test
<i>File: cypress/integration/examples/signup-command/signup-command-1.e2e.spec.js</i>
[include](../cypress/integration/examples/signup-command/signup-command-1.e2e.spec.js)

The assertions about the `user` subject yielded by the custom command are just to demonstrate you what the last `cy.then(() => user)` command is useful for: to know the user data from the caling test.

Cypress Custom commands have some useful options that we are not going to cover in this course, take a look at the [official documentation](https://docs.cypress.io/api/cypress-api/custom-commands.html#Arguments) for them.

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
