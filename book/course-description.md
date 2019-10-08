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

We are going to use **Jest, React Testing Library, Cypress** and all their useful plugins to increase our daily productivity and test reliability.
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
- Jest fundamentals
  - [What You will learn](jest-101/index.md)
  - [What is Jest](jest-101/what-is-jest.md)
  - [Setup](jest-101/setup.md)
  - [Running Jest](jest-101/running-jest.md)
  - [What is a Test Case](jest-101/test-case.md)
  - [Watch-mode](jest-101/watch-mode.md)
  - [Valid file test names](jest-101/test-filenames.md)
  - [Add Editor autocompletion](jest-101/editor-autocompletion.md)
  - [Built-in Matchers](jest-101/built-in-matchers.md)
  - [Custom Matchers](jest-101/custom-matchers.md)
  - [Testing Async Code](jest-101/testing-async-code.md)
  - [jsdom](jest-101/jsdom.md)
  - [Jest Lifecycle](jest-101/jest-lifecycle.md)
  - [Mock Functions](jest-101/mock-function.md)
  - [Mocking a module](jest-101/mock-modules.md)
  - [The Expect object](jest-101/expect-object.md)
  - [Timers](jest-101/timers.md)
- [The many wait to test React](many-ways-to-test-react.md)
- Intro to React testing
  - [What You will learn](intro-to-react-testing/index.md)
  - [Setup](intro-to-react-testing/setup.md)
  - [react-dom-test-utils](intro-to-react-testing/react-dom-test-utils.md)
  - [Hooks and act](intro-to-react-testing/hooks-and-act.md)
  - [jest-dom](intro-to-react-testing/jest-dom.md)
- React Testing Library
  - [What You will learn](react-testing-library/index.md)
  - [What is React Testing Library](react-testing-library/what.md)
  - [Why React Testing Library](react-testing-library/why-react-testing-library.md)
  - [Setup React Testing Library](react-testing-library/setup.md)
  - [Rendering using React Testing Library](react-testing-library/rendering.md)
  - [Using DOM testing library](react-testing-library/dom-testing-library.md)
  - [Implementing and Testing new features](react-testing-library/custom-input.md)
  - [Dealing with Context Providers](react-testing-library/context.md)
  - [Testing components using Redux](react-testing-library/redux.md)

#### Attendees

This course is for all the developers who have already worked with React but have not yet started, or have not yet succeeded in testing their React web applications. At the end of the course, you will be able to apply the fundamental principles of the test methodologies to understand what and how to test effectively.

#### Participation requirements

To participate it is necessary, or at least strongly recommended, that you already know the basic concepts behind React: JSX, the components, and their status, lifecycle events, user interaction management.
