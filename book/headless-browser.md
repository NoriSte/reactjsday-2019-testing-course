# Headless browser

A headless browser is a standard web browser without a GUI. You instrument it with some APIs that replicate the user actions (navigating, clicking, typing, etc.) and you can leverage it to automate everything that requires a running browser.

[Selenium](https://www.seleniumhq.org/projects/webdriver/) and [Puppeteer](https://pptr.dev) are the most used browser automation tools while [Cypress](https://cypress.io), [TestCafé](https://testcafe.devexpress.com/), [Protractor](https://www.protractortest.org/#/), etc. leverage the same mechanism with the purpose of testing a web app.

Let's take a look at what a "browser without GUI" means with the first example using Cypress (why Cypress? Go to the [Cypress vs other tools](cypress-vs-other-tools.md) chapter).

<i>File: cypress/integration/examples/headless-browser.spec.js</i>
[include](../cypress/integration/examples/headless-browser.spec.js)

Cypress is going to run this test, visit the specified page and take a screenshot.

And try to run it through the terminal

```
$ npx cypress run --spec "cypress/integration/**/headless-browser.*"
```

what does it do?

- it runs [Cypress in headless mode](https://docs.cypress.io/guides/guides/command-line.html#cypress-run) (without a GUI)
- it asks [cypress to run only](https://docs.cypress.io/guides/guides/command-line.html#cypress-run-spec-lt-spec-gt) the test with the filename containing `headless-browser`

For your convenience, you can run directly

```
$ npm run example:headless-browser
```

that's the output...

```

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:    3.4.1                                                                              │
  │ Browser:    Electron 61 (headless)                                                             │
  │ Specs:      1 found (examples/headless-browser.spec.js)                                        │
  │ Searched:   cypress/integration/**/headless-browser.*                                          │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running: examples/headless-browser.spec.js...                                            (1 of 1)


  Headless browser

    ✓ Must visit the site and take a screenshot (15375ms)

...

```

... and the screenshot taken by Cypress.

<div style="max-height: 500px; overflow:hidden;">
    <img src="../assets/images/headless-browser-screenshot-2.png" alt="Headless browser screenshot" style="width: 100%; max-width: 300px; margin-left: auto; margin-right: auto;" class="img-border"/>
</div>

<br /><br />

As you can see, it's the screenshot of the [ReactJSDay website](https://2019.reactjsday.it).

Take a look at the Cypress log, it launched Electron (a sort of soft version of Chrome) in headless mode, it launched the test and the test saved the screenshot. While Electron is a real browser, you have not seen anything about it: that's how a headless browser works!

Every headless browser could be launched in non-headless mode (with a GUI, like the standard browsers we use to browse the web) and you can do the same with Cypress too.
<br />
Try running

```
$ npx cypress open
```

or

```
$ npm run cy:open
```

The Cypress UI pops up, look for the `headless-browser.spec.js` test and launch it

<img src="../assets/images/headless-browser-spec.png" alt="Headless browser"/>

Cypress launch the Electron browser and run the test inside it

<img src="../assets/images/headless-browser-screenshot.png" alt="Headless browser"/>

That's what "leveraging a headless browser" means: automating some actions inside a browser that can be launched without a GUI (or with it if needed).

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
