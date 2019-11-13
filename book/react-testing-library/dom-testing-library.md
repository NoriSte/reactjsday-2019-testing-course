# Dom Testing library

[`dom-testing-library`](https://testing-library.com/docs/dom-testing-library/) is the project used by [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro) to query components. `react-testing-library` re-exports all `dom-testing-library` utilities so, in the next examples, we will import from `@testing-library/react` instead of `@testing-library/dom`.

## Queries

the main concept of `dom-testing-library` are [queries](https://testing-library.com/docs/dom-testing-library/api-queries), a set of utilities to find elements in the DOM. The queries are divided into three categories with different features, each category offers the same query in two versions, to query a _single_ element and to query _all_ matching elements.

### `getBy` queries

[`getBy*`](https://testing-library.com/docs/dom-testing-library/api-queries#getby) queries return the first matching node found
and have two important features

- throw an error if no elements match (allow to make expectations without using expect directly)
- throw if more than one match is found (use [`getAllBy*`](https://testing-library.com/docs/dom-testing-library/api-queries#getallby) queries if you expect more elements matching).

An example:

```jsx
import React from "react";
import { render } from "@testing-library/react";

function App() {
  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
}

test("render app", () => {
  const { getByText } = render(<App />);

  getByText("Hello!");
});
```

### `queryBy` queries

[`queryBy*`](https://testing-library.com/docs/dom-testing-library/api-queries#queryby) queries return the first matching node found, and return `null` if no elements match (like [`document.querySelector`](https://developer.mozilla.org/it/docs/Web/API/Document/querySelector)). This is useful for asserting that an element is not present in the document.

Remember that they throws if more than one match is found (use [`queryAllBy*`](https://testing-library.com/docs/dom-testing-library/api-queries#queryallby) queries instead).

An example:

```jsx
import React from "react";
import { render } from "@testing-library/react";

function App() {
  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
}

test("render app", () => {
  const { queryByText } = render(<App />);

  const h1 = queryByText("Hello!");
  expect(h1).toHaveTextContent("Hello!");
  expect(queryByText("Goodbye!")).not.toBeInTheDocument();
});
```

### `findBy` Queries

[`findBy*`](https://testing-library.com/docs/dom-testing-library/api-queries#findby) queries return a promise which resolves when an element is found which matches the given query

- will reject after 4500 ms is no matches occur
- is the combination of `getBy` and the utility [`waitForElement`](https://testing-library.com/docs/dom-testing-library/api-async#waitforelement)
- will reject if no element is found
- will reject if more than one element is found, to find more than one element, then use `findAllBy*` queries

#### example

```jsx
import React from "react";
import { render } from "@testing-library/react";

function App() {
  const [text, setText] = React.useState("start");

  React.useEffect(() => {
    setTimeout(() => {
      setText("finish");
    }, 500);
  }, [text]);

  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
}

test("render app", async () => {
  const { getByText, findByText } = render(<App />);

  getByText("start");
  await findByText("finish");
});
```

## Other Utilities

### [`wait`](https://testing-library.com/docs/dom-testing-library/api-async#wait)

Calling `await wait(callback)` will call the callback until it resolves, rejects, or the timeout fires.

### Mutation API

Some utilities based on the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) API are available to deal with cases where we have to wait for DOM elements to appear, disappear, or change.

- [`waitForElement`](https://testing-library.com/docs/dom-testing-library/api-async#waitforelement)
- [`waitForDomChange`](https://testing-library.com/docs/dom-testing-library/api-async#waitfordomchange)
- [`waitForElementToBeRemoved`](https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved)

A `waitForElementToBeRemoved` example:

```jsx
import React from "react";
import { render, waitForElementToBeRemoved } from "@testing-library/react";

function App() {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 500);
  }, []);

  return <div>{show ? <h1>hello</h1> : null}</div>;
}

test("render app", async () => {
  const { getByText } = render(<App />);

  await waitForElementToBeRemoved(() => getByText("hello"));
});
```

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
