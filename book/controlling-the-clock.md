# Controlling the clock

Sometimes we had to test something that relies on time interval/timeouts. This kind of waitings could slow down our test suite and we know that's bad. While testing timeouts, remember that Cypress allows you to [control the clock](https://docs.cypress.io/guides/guides/stubs-spies-and-clocks.html#Clock). For example, say that we want to show the user a particular message if the registration AJAX requests take more than two seconds... Take a look at the next test

```javascript
context("Signup flow", () => {
  it("The happy path should work", () => {
    // it allows you to manage manually the front-end clock, see the `cy.tick` call
    cy.clock();

    // ... the rest of the test

    // form submit...
    cy.get("form")
      .within(() => cy.findByText(strings.signUp).click());

    // moves forward the browser clock by 2 seconds
    cy.tick(2000);

    cy.getByText("Please, be patient...").should("be.visible");
  });
});
```

The above test does not wait for two seconds (a giant wasted amount of time) until the _"Please, be patient..."_ text appears. Instead, it **moves the browser clock forward** and the test duration saves two precious seconds!

Always remember: **do not sacrifice test speed for anything**! You are going to take advantage of a fast test every time you launch it (that means hundreds of times)!

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
