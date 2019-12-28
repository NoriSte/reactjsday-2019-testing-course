# What is `react-testing-library`

React Testing Library is a package that offers a set of utilities to makes testing React applications simple by enforcing good practices and offering a small but very powerful set of APIs. It leverages [`dom-testing-library`](https://testing-library.com/docs/dom-testing-library/intro) and `react-dom/test-utils` under the hood and exposes APIs tailored to work with React components.

### [Testing Library principles](https://testing-library.com/docs/guiding-principles)

> We try to only expose methods and utilities that encourage you to write tests that closely resemble how your web pages are used.

> Utilities are included in this project based on the following guiding principles:
>
> - If it relates to rendering components, then it should deal with DOM nodes rather than component instances, and it should not encourage dealing with component instances.
> - It should be generally useful for testing the application components in the way the user would use it. We are making some trade-offs here because we're using a computer and often a simulated browser environment, but in general, utilities should encourage tests that use the components the way they're intended to be used.
> - Utility implementations and APIs should be simple and flexible.

### FAQs

- Q: does `react-testing-library` is a substitute to Jest?
- A: No they complement each other

- Q: can `react-testing-library` be used without Jest?
- A: Yes

- Q: I'm testing using [`Enzyme`](https://github.com/airbnb/enzyme) should I switch?
- A: It depends, they solve some of the same problems in very different ways but also have differences and unique features not available to the other

- Q: Can `react-testing-library` coexist is a project using `Enzyme`?
- A: Yes, is possible to use both in the same file

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
