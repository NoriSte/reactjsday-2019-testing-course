# Continuous integration

Cypress has a [dedicated CI page](https://docs.cypress.io/guides/guides/continuous-integration.html) on its site with configurations [for the different providers](https://docs.cypress.io/guides/guides/continuous-integration.html#Examples). Cypress can be run with its UI (`npx cypress open`) or in headless mode (`npx cypress run`), the only thing you need to do is to launch the front-end server and then, when the server is up and running, launch Cypress in headless mode.

The most used package is [start-server-and-test](https://github.com/bahmutov/start-server-and-test) that allows you to do exactly what its name says. You can see it in action even in the [repository of this book](https://github.com/NoriSte/educative-cypress-course/blob/master/package.json), take a look at the `test` script, it's something like

```json
"scripts": {
  "test": "start-server-and-test realworld:start http://localhost:4100 cy:run"
}
```

you can read the script as: run the `realworld:start` script and, when the `http://localhost:4100` endpoint becomes available, launch the `cy:run` script.

Cypress has its own [Dashboard product](https://www.cypress.io/dashboard/) that allows easy navigation between all the test runs, the single tests, the results. It allows to parallelize the test runs and to host the test videos.

If you want to see the Cypress Dashboard in action, [open it and watch the videos of this project](https://dashboard.cypress.io/#/projects/jdiekj/runs), they are public (GitHub/Google sign in required) and Cypress allowed us to leverage the OSS plan for this book.

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
