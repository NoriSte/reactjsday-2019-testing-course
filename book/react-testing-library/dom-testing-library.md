# Dom Testing library

`dom-testing-library` is the project used by `react-testing-library` to query components

`dom-testing-library` is a dependency of `react-testing-library`

`react-testing-library` re-exports all `dom-testing-library` utilities

so in these examples we will import from `@testing-library/react` instead of `@testing-library/dom`

## Queries

the main concept of `dom-testing-library` are queries, a set of utilities to find elements in the dom, these are divided into 3 categories with different features, each category offert the same query in two versions, to query a _single_ element and to query _all_ matching elements

### `getBy` Queries

`getBy*` queries return the first matching node found
and have two important features

- throw an error if no elements match (allow to make expectations without using expect directly)
- throw if more than one match is found (use getAllBy if you expect more elements matching).

#### example

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

### `queryBy` Queries

`queryBy*` queries return the first matching node found, and return null if no elements match. (like `document.querySelector`)

This is useful for asserting that an element is not present in the document

- throws if more than one match is found (use queryAllBy instead).

#### example

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
  expect(queryByText("CIAONE!")).not.toBeInTheDocument();
});
```

### `findBy` Queries

`findBy*` queries return a promise which resolves when an element is found which matches the given query

- will reject after of 4500ms is no matches occur
- is the combination of `getBy` and the utility `waitForElement`
- will rejects if no element is found
- will rejects if more than one element is found, to find more than one element, then use findAllBy

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

## other utilities

### `wait`

calling `await wait(callback)` will call the callback until the callback stops throw or the timeout fires

### mutation api

some utilites based on [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) API are available to deal with cases were whe have to wait for DOM elements to appear, disappear, or change

- `waitForElement`
- `waitForDomChange`
- `waitForElementToBeRemoved`

#### `waitForElementToBeRemoved` example

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
