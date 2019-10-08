# Cypress vs other tools

Cypress **has been created with UI testing in mind**, it's not a generic browser automation tool and it has a lot of magic that gets our testing life easier.
You have to get a bit accustomed to the logic and syntax but here are summarized some advantages compared to more generic tools (like Selenium and Puppeteer):

- AJAX interception and stubbing is super easy: [waiting for an AJAX request](waiting-for-ajax-request.md) and [stubbing the back-end](stubbing-the-backend.md) has never been easier. Mix it with analyzable request/response payloads and you get total control over front-end/back-end communications

- [automatic waitings and retry-ability](https://docs.cypress.io/guides/core-concepts/retry-ability.html) avoid you adding fixed time sleeps that are bad for test durations (read more in the [Await, do not make your E2E tests sleep](https://dev.to/noriste/await-do-not-make-your-e2e-tests-sleep-4g1o) article)

- no fights with test timeouts: tests have not timeouts, every single command has

- super neat and complete [documentation](https://docs.cypress.io/guides/overview/why-cypress.html), full of advice and best practices

- [automatic screenshot and videos](https://docs.cypress.io/guides/guides/screenshots-and-videos.html) on test failures

- the [Test Runner](https://docs.cypress.io/guides/core-concepts/test-runner.html) is astonishing

  - you do not need to slow down the browser to understand what's happening. The Test Runner reports everything and allows step-by-step navigation

  - if something is not enough clear, a click on a step reports detailed info in the DevTools console

  - you can play/pause the test

  - tracks every AJAX request

  - understanding which test is running is easy

- some more practical advantages like avoiding single Chrome instance and auto-close management, automatic page error reports, etc.

- last but not least: you can leverage tens of [Cypress plugins](https://docs.cypress.io/plugins/index.html)

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
