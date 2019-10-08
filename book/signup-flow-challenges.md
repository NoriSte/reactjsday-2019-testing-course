# The first E2E test: signup

There is a lot to tell and care when writing E2E tests, we are goign to use one of the most famous examples: the signup flow. Testing this kind of flow is useful because:

- it fills a form

- it contains an AJAX request

- it contains some error flows to be tested

- most of the flows need a registered user

Please note: you need to have the [RealWorld](about-the-book.md#code) example running, be sure that you have `$ npm run realworld:start` running (if something does not work, take a look at the [installation instructions](../README.md)).

### Challenges

If you want to test the signup flow we need:

- to identify the HTML elements we need to interact with

- to be sure that the test always pass, regardless of the user we are registering already exists or not

- to create a simplified and fast version of the whole signup flow, other tests will need a registered user too

Let's face them one by one in the next chapters.

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
