# Testing rules

TODO: transform this file into some slides

- you must write the test as soon as you write the code. Writing the test some days after the code is useless, you have forgotten half of the choices you made (choices that you need to test)

- a test fails is a good thing, really! Because it's preventing a regression! The important thing is that...

- ... the tests must not fail for nothing. False negative tests are the worst ones, you do not why they fail and you stop trusting them

- obviously, the opposite is important too: the tests must fail if the app does not work, otherwise what are they testing?

- the tests must be simple. Super simple. They must be simple to be read, simple to be understood, simple to changed. The tests must be an ally, a simple scripts that perform some checks in place of you. Complex and unclear tests are an enemy, you write some tests to allow yourself to refactor the code, you can not spend your time refactoring the tests too. Last but not least: debugging a failing test is way harder that debugging an application (example: write a test with lot of before hooks, variables outside the tests etc).
  Think twice before DRYing a test code. While testing, you need to change more less every line of code to simulate the different cases. Complex DRY increases the test complexity and makes you add a lot of conditions to the DRYed code. Wrong abstraction in tests costs more than wrong abstraction in your code. Avoid conditions too if you can, the test code must be straightforward

cognitive load image https://github.com/goldbergyoni/javascript-testing-best-practices/blob/master/assets/headspace.png

- if the tests fail, they must give useful feedback. They must tell you what failed and why, without re-launching or debugging them (example: `expect([1, 2, 3]).toHaveLength(3);` instead of `expect([1, 2, 3].length === 3).toBe(true);`)

- the tests must be deterministic: if you run them hundred times, the result must be the same. If they are not deterministic, you must think what influences them and how to write better tests (example: testing a unit based on date?)

- the tests must fail before you write the code and succeed when you have written the code. Otherwise, you can not be sure that the tests are testing your code and that is your code that get them pass. You could neither be sure you have sistematically replicated the bug. You risk to be have a useless test (example: Ste has an example of a coding challenge with a useless test)

- the tests must be fast, as fast as possible. You can not sacrifice speed for reliability, but the speed is really important because the faster the tests are, the faster you have feeddback, the higher the chance you run them frequently, the sooner you discover regressions. Slow tests make you move your mind to another task, make you waste your time, make you hungry when they fail after a 30-minutes pipeline, and, sooner or later, they make you think about removing them... (example: jest/cypress clock management)

- skip and only are good friends (jest.todo too)

- never do whitebox testing. You have to test APIs, contracts and behaviours, not internal details. You must test as the consumer, not as the developer (example: enzyme with state tests)

- as much as you can, you should avoid that the tests feil because of some slight code changes. Import constants (example: RTL acting on a button with an imported string)

- the tests must be indipendent, they must not share the state (example: a shared variable)

- you can not interact manually with the tests. It's easier when doing functional tests but it's a generic rule, the tests must not depend on human changes (example: clicking on a button in a functional test)

- different test types provide different feedback (and cost), get used with that. Following the blackbox testing rule, an E2E test can not provide useful feedback for a single function, and a unit test can not tell you if your app works

- code coverage helps us finding what we have not tested yet, it is not an end in itself (example: test without assertions just to increase the coverage)

- E2E tests are not so important, they need the whole stack and they give too much generic feedback. They check the whole system, it's true, but thay are super brittle, so forget about their importance (TODO: move this part where speaking about e2e tests)

- if you're not enough confident about your application, think twice about your tests. Why they do not give you enough confidence? How could you improve them? (example: Ste while implementing the roles in the webapp setting all he old tests with admin users to avoid changing them)
