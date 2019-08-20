# What should I not test

TODO:

- external services, you should test how you consume them, not if they work (has gmail sent the email?)

- anything that you do not control (cache? network? justo to make an example)

- native APIs (example: document.cookie?)

- third party scripts (react itself or redux)

- you must not test everything, E2E tests are good for happy paths only
