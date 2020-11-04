# Course description

### React Testing 101: component, integration, and end-to-end testing

Being able to test components and web-apps developed with React is an increasingly important requirement for a front-end developer. There are tools and libraries that simplify the testing process but the learning curve can seem daunting.

> "What’s the right way to start testing my web applications?"

> "It’s unclear what I'm supposed to test (and what not) and how to do it"

> "My current tests fail all the time and don't help me preventing new bugs"

Does this sound familiar?

This course aims to provide basic information, principles and experience-based advices, to **enter the world of testing methodologies**.

Testing your own web applications is much easier and more profitable than you might think. Even if some advances concepts and benefits may only become evident in the medium to long run this course serves the purpose to overcome the initial obstacles and understand how to take actions and leverage the benefits of testing **immediatetely** .

During the day, we will see all the useful tests for a web-app developed with React, dealing with the typical cases we encounter on a daily basis. During this course we will teach you:

- The basics and advantages of the main testing techniques applied to React
- How to test your React components productively
- The best practices to follow to write useful and lasting tests
- How to test different user flows without a working back-end
- How to write effective end-to-end tests (E2E)
- How to integrate tests into development and Continuous Integration pipelines

We will alternate theoretical explanations with live coding sessions, at the end of the course the source code of all the exercises, the material used for explanations, and other in-depth materials will be made available.

#### Topics:

- [Test panorama](types-of-test.md)
- [What is an E2E test](what-is-an-e2e-test.md)
  - [Browser automation](headless-browser.md)
  - [Pros and cons of E2E tests vs UI integration tests](stubbing-the-backend.md)
- [Cypress](cypress-vs-other-tools.md)
  - [The Test Runner](opening-cypress.md#the-test-runner)
  - [Automatic waitings](cypress-waitings-and-execution-order.md#automatic-waiting)
  - [Automatic screenshots e videos](https://docs.cypress.io/guides/guides/screenshots-and-videos.html#Screenshots)
  - [Asynchronous execution](cypress-waitings-and-execution-order.md#test-code-execution-order)
- [Cypress as your main development browser](cypress-as-a-development-tool.md)
- Best practices
  - [How to identify DOM elements](cypress-testing-library.md)
  - [Waitings instead of pauses, what deterministic events are](waiting-for-ajax-request.md#ajax-request-waiting)
  - [The right use of the assertions](payload-assertions.md)
- [Why the tests must be as simple as possible](testing-rules.md#simple)
- Usefulness for all the team members
  - [Naming conventions and dedicated scripts](dedicated-scripts.md)
  - [Monitoring tests](monitoring-tests.md)
- Cypres advanced use
  - [Custom commands](signup-custom-command.md)
- [Visual Regression Testing for the whole web app](visual-regression-testing.md)
- [Continuous Integration](continuous-integration.md)

#### Attendees

This course is for all the developers who have already worked with React but have not yet started, or have not yet succeeded in testing their React web applications. At the end of the course, you will be able to apply the fundamental principles of the test methodologies to understand what and how to test effectively.

#### Participation requirements

To participate it is necessary, or at least strongly recommended, that you already know the basic concepts behind React: JSX, the components, and their status, lifecycle events, user interaction management.
