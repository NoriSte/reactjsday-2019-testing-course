# Testing rules

- you must write the test as soon as you write the code. Writing the test some days after the code is useless, you probably forgot half of the choices you made (choices that you need to test)

- a failing test is a good thing, really! Because it has protected us from a regression! The important thing is that...

- ... The tests should not fail for randomly. False-negative tests are the worst ones, you do not know why they fail and you stop trusting them

- obviously, the opposite is important too: tests must fail if the app does not work, otherwise, what are they testing?

- <span id="simple"></span>tests must be simple. Simple to be read, understood, and changed. Tests must be an ally, simple scripts that perform some checks for you. **Complex and unclear tests are an enemy**, you write some tests to allow yourself to refactor the code, you can not spend all your time refactoring the tests. And remember that... (read the [Avoid Nesting when you're Testing](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing) article of Kent C. Dodds)

- ... Debugging a failing test is way harder than debugging an application

- <span id="dry"></span>**do not DRY the test code too early**. While testing, you need to change more or less every line of the test code to simulate the different cases. Applying DRY when not necessary increases the test complexity and makes you add a lot of conditions to the DRYed code

- avoid conditional tests as much as you can, the test code must be straightforward

- a failing test must give useful feedback. It must tell you what failed and why, without re-launching or debugging it

- <span id="deterministic-tests"></span>**tests must be deterministic**: if you run them a hundred times, the result must be the same. If they are not deterministic, you must think about what influences them and how to write better tests

- deterministic tests also mean that you should not rely on their execution order. Otherwise, you have extremely brittle tests that need to be run in a specific order

- the test must fail before you write the code and succeed when you have written the code. Otherwise, you can not be sure that the test is testing your code and that is your code that gets it to succeed. If you are fixing a bug, you could neither be sure you have systematically reproduced it. You risk having a useless test and a false sense of confidence

- **tests must be fast, as fast as possible**. You should never sacrifice speed for reliability, but the speed is really important because the faster the tests are, the faster you have feedback, the higher the chance you run them frequently, the sooner you discover regressions. Slow tests make you move your mind to another task, make you waste your time, make you angry when they fail after a 30-minutes pipeline, and, sooner or later, You will start wondering about removing them...

- <span id="whitebox-testing"></span>never do white-box testing. You have to test APIs, contracts, and behaviors, not internal details. You must test as the consumer, not as the author ([Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details) by Kent C. Dodds)

- tests failing because of some slight code changes are fragile and should be avoided

- <span id="shared-state"></span>tests must be independent from each other, they must not share any state

- you cannot manually interact with the tests. It's easier when doing functional tests but it's a generic rule, the tests must not depend on human changes

- different test types provide different feedback and have different cost, get used with that. Following the black-box testing rule, an E2E test can not provide useful feedback for a single function, and a unit test can not tell you if your app works

- code coverage helps us find what we have not tested yet, it is not an end in itself

- if you're not enough confident about your application (you are not sure that it works even if the tests pass), think twice about your tests. Why they do not give you enough confidence? How could you improve them?

- <span id="skip-and-only"></span>don't underestimate `skip` and `only` test utilities, these are super useful to run a portion of the tests and remove unnecessary noise

- you should not test external services, you should test how you consume them, not if they work or not

- you should not test third party scripts and libraries

- you should not test native APIs

- last but not least: always remember that **testing and TDD are two different things**. TDD is a step further and requires a particular context to be practiced, you can test everything without ever applying TDD

<p style='text-align: right;'>Author: <a href="about-us.md#stefano-magni">Stefano Magni</a></p>
