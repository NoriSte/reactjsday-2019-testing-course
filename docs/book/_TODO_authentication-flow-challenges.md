TODO: I started writing this chapter as an authentication flow one, then I started speaking about the signup flow... but the challenges could be useful when spaeking about the authantication, that0s why I have not remove it yet

# The first E2E test: signup

There is a lot to tell and care when writing E2E tests, we are goign to use one of the most famous example: the signup flow. Testing this kind of flow is useful because:

- it fills a form

- it contains an AJAX request

- it contains some error flows to be tested

- most of the flows need a registered user (speaking about)

Please note: you need to have the [RealWorld](about-the-book.md#code) example running, be sure that you have `$ npm run realworld:start` running (if something does not worl, take a look at the [installation instructions](../README.md)).

<!-- TODO: write the instructions in the README and point to the specific block -->

### Challenges

If you want to test the signup flow we need:

- to have a registered user first

- to know his credentials

- to be sure that the registered user has always the same password

- to identify the HTML elements we need to interact with

The pains start with the data-related two points, there are some options and some constraints to be considered:

- if we have a back-end mirror (a back-end that starts with an empty database, launched in a container alongside the front-end application) we could create a database with the user data contained since the beginning. The main advantage is that you (the front-end developer) do not need to care about seeding the database before the test. Tha big disadvatage is that is hard to have realiable data created without a front-end.
  <br/>
  Ex. think about a user with some products in the shopping cart: it's easier to add all the necessary data with an automated browser that goes through all the steps instead of seeding the database in advance... Because seeding the DB in advance requires to write a script that nees to be maintained in order to create reliable data

- there are some flows that can not leverage the same user: the change password needs a dedicated, registered, user because if it changes the password of the user used for authentication... The latter test will not work anymore! Hence, we need more than a single user

- you can not rely on the execution order of the tests, otherwise you do not have deterministic tests anymore (do you remember it from the [testing-rules](testing-rules.md)?). It means that, for example, you can not leverage a user created by the signup flow tests

It obviously dependes on the omplexitand and shape of the project
