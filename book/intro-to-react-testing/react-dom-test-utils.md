# Testing with ReactDOM

Using React DOM for testing means rendering you React application the same way we render it in a real browser, by calling [`ReactDOM.render`](https://reactjs.org/docs/react-dom.html#render) with two arguments, a [`React.Element`](https://reactjs.org/docs/rendering-elements.html) (made directly by JSX in most cases) and a `node` where to mount the application. A basic example of a test that renders using ReactDOM is the following

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => <h1>Hello!</h1>

test('render app', () => {
  const container = document.createElement('div')
  ReactDOM.render(<App />, container)
})
```

After the ReactDOM call, we are able to make assertions of the content of the DOM by querying the `container` HTML node. For example we can test that inside the DOM there's now a `h1` with content `Hello!`

```diff
  import React from 'react'
  import ReactDOM from 'react-dom'

  const App = () => <h1>Hello!</h1>

  test('render app', () => {
   const container = document.createElement('div')
   ReactDOM.render(<App />, container)

+   expect(container.querySelector('h1').textContent).toBe('Hello!')
  })
```

### When we make a mess, we have to clean!

In order for the React event system to work, is **important** that the `container` element passed to `ReactDOM` gets appended to `document.body` (in React all event listens are attached to `document`). The example above works for a simple scenario but if the component had an event handler declared it would not work.

The correct way is:

- when we want to render a component
  - create a container `div`
  - append this `div` to `document.body`
- when we completed the test
  - unmount the react application
  - clean the DOM

Doing this inside every test would be not practical or fun, we can use Jest `beforeEach` and `afterEach` utilities to make it simpler:

```diff
  import React from 'react'
  import ReactDOM from 'react-dom'

+ let container = null
+ beforeEach(() => {
+   // setup a DOM element as a render target
+   container = document.createElement('div')
+   document.body.appendChild(container)
+ })
+
+ afterEach(() => {
+   // cleanup on exiting
+   ReactDOM.unmountComponentAtNode(container)
+   container.remove()
+   container = null
+ })

  const App = () => <h1>Hello!</h1>

  test('render app', () => {
    const container = document.createElement('div')
    ReactDOM.render(<App />, container)

    expect(container.querySelector('h1').textContent).toBe('Hello!')
  })
```

The `beforeEach` call creates a new `container` each time and appends it to `document.body`. The `afterEach` call will call [`ReactDOM.unmountComponentAtNode(container)`](https://reactjs.org/docs/react-dom.html#unmountcomponentatnode) which will trigger the unmount of components and all [`componentWillUnmount`](https://reactjs.org/docs/react-component.html#componentwillunmount) liecycle hooks, removes the container from the DOM and set the variable back to `null`. Please note that setting the `container` variable to `null` should not be necessary due to `beforeEach` overriding it again, but this is to make sure nobody can read the state of the DOM.

### Testing a stateful component

```jsx
/* ######## setup code above ######## */

class Button extends React.Component {
  state = {
    value: 0,
  }

  render() {
    return (
      <div>
        <div>
          value: <span id="value">{this.state.value}</span>
        </div>
        <button
          onClick={() =>
            this.setState(state => {
              return { value: state.value + 1 }
            })
          }
        >
          increment
        </button>
      </div>
    )
  }
}

test('stateful button', () => {
  ReactDOM.render(<Button />, container)

  const value = document.getElementById('value')

  expect(value.textContent).toBe('0')

  const button = document.querySelector('button')
  button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  expect(value.textContent).toBe('1')
})
```

### Interacting with the button

[`react-dom`](https://reactjs.org/docs/react-dom.html) offers a set of utilities found in the package [`react-dom/test-utils`](https://reactjs.org/docs/test-utils.html#other-utilities) to help to interact with the React applications in a DOM environment (eg. simulating user actions). In the previous example [`ReactTestUtils.Simulate.click(button)`](https://reactjs.org/docs/test-utils.html#simulate) could be used instead of [`dispatchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)

```diff
/* ######## setup code above ######## */

+ import { Simulate } from 'react-dom/test-utils'

  test('stateful button', () => {
    ReactDOM.render(<Button />, container)

    const value = document.getElementById('value')
    expect(value.textContent).toBe('0')

    const button = document.querySelector('button')
-   button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
+   Simulate.click(button)
    expect(value.textContent).toBe('1')
  })
```

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
