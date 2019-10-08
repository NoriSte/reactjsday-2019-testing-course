# Why is E2E testing not enough?

E2E tests and UI integration tests give us high confidence about the whole application, so why should we write low-level tests? There are a couple of reasons:

- UI Integration Tests are fast but, more in general, Cypress is not. Cypress is fast if it's opened but if you need to run all the tests together you have to wait minutes, not seconds nor tenth of seconds

- so high-level tests can tell you what did not work but usually, they cannot tell you why. You know that an AJAX call has not started but why has not started?

- rendering the entire application is not always the best way to test something, a lot of parts are not related to the render phase at all, starting a real browser to test them is exaggerated

- the end-user is probably the most important user of the application... But he/she is not the only one! All the components and the functions are consumed by the developer, not by the end-user. Every unit of the project has some APIs (its contract) and they need to be tested too. Testing an end-user flow does not allow you to replicate all the API cases

- everything is integrated to compose the final application, but you need to test littler integrations to have the confidence you need

Obviously, it all depends on the project size. A landing page could not need hundreds of different tests but a standard little/medium application needs them.

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
