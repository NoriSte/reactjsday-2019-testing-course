# What is an E2E test?

TODO: transform it in slides
TODO: add a video of the e2e tests with the realworld app

An E2E test runs the whole web app in a [headless browser](headless-browser.md) when the front-end application interacts with the back-end one, with a working database, and checks that **everything works as expected**. It checks everything: from the user interactions (one of the "end") to the business data (the other "end"): everything must work as designed.

E2E tests are typically slow because:

- they need a **working back-end** application. You can not launch the E2E tests without a server so you, as a front-end developer, depend on the back-end developers and infrastructure to work.
  <br />
  The back-end could be:

  - **launched alongside the front-end** application. A mirror of the back-end is up and running, typically in a [Docker](https://www.docker.com) container, the database is empty and you need to seed it with the data that you need in order to replicate the various scenario
  - **exists externally** from the container where the tests are run. The data could already exist in the database but you need to get them pristine before every test, because the tests need always the same data to be effective

- they need a lot of **reliable data**. The tests must be deterministic (do not forget about the [testing rules](testing-rules.md)) and so, they need always the same data

An important note: the front-end application is not deployed in advance and then tested. Instead, it needs to be built on the fly, launched (usually with Docker) and then, if the tests pass, the new front-end app is going to be deployed. That's how the CI/CD pipelines work.

### What flows should be E2E tested?

- the Happy Path flows: you need to be sure that, at least, the users are able to complete the basic operations

- everything valuable for your business: happy path or not, test whatever your business cares about (prioritizing them, obviously)

- everything that breaks often: weak areas of the system must be checked too

In the next examples we are going to write some E2E tests and to understand why they are not feasible to be used as the only/main test type. They are pretty important because they test everything (both the front-end and the back-end) but **they must be used carefully** to avoid brittle and hour-long test suites.

<!-- TODO: repeat it in the conclusions? -->

At the end of our testing journey, you will think about E2E tests as "back-end tests".
