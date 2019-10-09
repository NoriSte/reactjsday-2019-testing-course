# Hooks and `act`

We can now convert the `Button` component used in the previous section into a functional component using the [`useState`](https://reactjs.org/docs/hooks-reference.html#usestate) hook:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  ReactDOM.unmountComponentAtNode(container)
  container.remove()
  container = null
})

function Button() {
  const [value, setValue] = React.useState(0)
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

  const button = document.querySelector('button')
  Simulate.click(button)
  expect(value.textContent).toBe('1')
})
```

Please note that the test has not changed at all. We have refactored the whole component without changing the test! That's one of the goal of testing itself and it's made easy because we have tested the component behaviour from the external point of view (black-box testing), not from the internal one ([white-box testing](../testing-rules.md#whitebox-testing)).

The next task is: show the current counter value in the tab title. To implement this feature we will use [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect) hook that will change the document title every time the counter state changes

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

The test now fails...

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

Why isn't the title changed? Let's speak about [`act`](https://reactjs.org/docs/test-utils.html#act).

### `act`

In order for components that use `useEffect` and other hooks to work properly in a testing environment we have to use un utility called `act`: `import { act } from 'react-dom/test-utils`

> When writing UI tests, tasks like rendering, user events, or data fetching can be considered as “units” of interaction with a user interface. React provides a helper called `act()` that makes sure all updates related to these “units” have been processed and applied to the DOM before you make any assertions: [react-documentation](https://reactjs.org/docs/testing-recipes.html#act)

Usage:

```js
act(() => {
  // anything that causes a component to render/rerender
})
// make assertions
```

we need to wrap every interactions and operations that cause a component to render or rerender inside `act` to make it behave as it would in a real application

```jsx
act(() => {
  ReactDOM.render(<Button />, container)
})
```

Now we can fix the test using `act`. In our failing example, we can wrap `ReactDOM.render` and the _click_ simulations into `act` to see the test passing

```diff
/* ######## setup code above ######## */

  function Button() {
    const [value, setValue] = React.useState(0)

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
```

If you run the button in a real application. the browser will show the component working as intended with the tab's title updating according to the button clicks.

`act` must be used multiple times in case of multiple interactions, take a look at the code of the test if you want to add one more feature, like allow clicking up to a `max` number.

```
  //
  // NEW TASK: allowing the counter only increase
  // up to a given number
  //
  // example <Button max={2}/>
  // after the counter has reach 2 the button should be disabled
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
```

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
