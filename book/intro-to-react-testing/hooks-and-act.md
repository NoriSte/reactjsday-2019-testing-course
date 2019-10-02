# Hooks and `act`

We can now convert the `Button` component used in the previous section into a Functional Component using `useState` hook instead of a class

```jsx
import React from "react";
import ReactDOM from "react-dom";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

function Button() {
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <div>
        value: <span id="value">{value}</span>
      </div>
      <button onClick={() => setValue(value + 1)}>increment</button>
    </div>
  );
}

test("stateful button", () => {
  ReactDOM.render(<Button />, container);

  const value = document.getElementById("value");

  expect(value.textContent).toBe("0");

  const button = document.querySelector("button");

  Simulate.click(button);

  expect(value.textContent).toBe("1");
});
```

## updating the title with counter value

````
  // ```
  // NEW TASK: show the current counter value in the tab title
  // ```
````

to implement this feature we will use `useEffect` hook that will change the document title every time the counter state changes

```diff
/* ######## setup code above ######## */

  function Button() {
    const [value, setValue] = React.useState(0)

+   React.useEffect(() => {
+     document.title = value
+   }, [value])

    return (
      <div>
        <div>
          value: <span id="value">{value}</span>
        </div>
        <button onClick={() => setValue(value + 1)}>increment</button>
      </div>
    )
  }

  test('stateful button', () => {
    ReactDOM.render(<Button />, container)

    const value = document.getElementById('value')

    expect(value.textContent).toBe('0')
+   expect(document.title).toBe('0')

    const button = document.querySelector('button')

    Simulate.click(button)

    expect(value.textContent).toBe('1')
  })
```

our test fails!

```yaml
 FAIL  src/App.test.js
  ✕ stateful button (7ms)

  ● stateful button

    expect(received).toBe(expected) // Object.is equality

    Expected: "0"
    Received: ""

      46 |
      47 |   expect(value.textContent).toBe('0')
    > 48 |   expect(document.title).toBe('0')
         |                          ^
      49 |
      50 |   const button = document.querySelector('button')
      51 |

      at Object.toBe (src/App.test.js:48:26)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.636s, estimated 1s
```

### `act`

why isn't the title changed?

because in order for components that use `useEffect` and other hooks to work properly in a testing environment we have to use un utility called `act`

`import { act } from 'react-dom/test-utils`

> When writing UI tests, tasks like rendering, user events, or data fetching can be considered as “units” of interaction with a user interface. React provides a helper called act() that makes sure all updates related to these “units” have been processed and applied to the DOM before you make any assertions: [react-documentation](https://reactjs.org/docs/testing-recipes.html#act)

#### `act` usage

```js
act(() => {
  // anything that cause a component to render/rerender
});
// make assertions
```

we need to wrap any interaction and operations that cause a component to render or rerender inside `act` to make it behave like it would in a real application

```jsx
act(() => {
  ReactDOM.render(<Button />, container);
});
```

### Fixing our test to use `act`

in our failing examples we can wrap `ReactDOM.render` and the _click_ simulatios into `act` to see the test passing

````diff
/* ######## setup code above ######## */

  function Button() {
    const [value, setValue] = React.useState(0)

    // ```
    // NEW TASK: show the current counter value in the tab title
    // ```

    React.useEffect(() => {
      document.title = value
    }, [value])

    return (
      <div>
        <div>
          value: <span id="value">{value}</span>
        </div>
        <button onClick={() => setValue(value + 1)}>increment</button>
      </div>
    )
  }

  test('stateful button', () => {
-   ReactDOM.render(<Button />, container)
+   act(() => {
+     ReactDOM.render(<Button />, container)
+   })

    const value = document.getElementById('value')

    expect(value.textContent).toBe('0')
    expect(document.title).toBe('0')

    const button = document.querySelector('button')

-   Simulate.click(button)
+   act(() => {
+     Simulate.click(button)
+   })

    expect(value.textContent).toBe('1')
+   expect(document.title).toBe('1')
  })
````

running the button in a real application the browser will show the component working as intended with the tab's title updating according the button clicks

## allow clicking up to a max number

```
  //
  // NEW TASK: allowing the counter only increase
  // up to a given number
  //
  // example <Button max={10}/>
  // after the counter has reach 10 the button should be disabled
  //
```

we have been given a new feature to implement in our button.

```diff
/* ######## setup code above ######## */

- function Button() {
+ function Button({ max }) {
    const [value, setValue] = React.useState(0)

    React.useEffect(() => {
      document.title = value
    }, [value])

    return (
      <div>
        <div>
          value: <span id="value">{value}</span>
        </div>
-       <button onClick={() => setValue(value + 1)}>increment</button>
+       <button
+         disabled={value === max}
+         onClick={() => {
+           if (value < max) {
+             setValue(value + 1)
+           }
+         }}
+       >
+         increment
+       </button>
      </div>
    )
  }

  test('stateful button', () => {
+   const max = 2
    act(() => {
-     ReactDOM.render(<Button />, container)
+     ReactDOM.render(<Button max={max} />, container)
    })

    const value = document.getElementById('value')

    expect(value.textContent).toBe('0')
    expect(document.title).toBe('0')

    const button = document.querySelector('button')
+   expect(button.hasAttribute('disabled')).toBe(false)

    act(() => {
      Simulate.click(button)
    })
+   act(() => {
+     Simulate.click(button)
+   })
+   act(() => {
+     Simulate.click(button)
+   })

-   expect(value.textContent).toBe('1')
+   expect(value.textContent).toBe('2')
+   expect(button.hasAttribute('disabled')).toBe(true)
  })
+
```
