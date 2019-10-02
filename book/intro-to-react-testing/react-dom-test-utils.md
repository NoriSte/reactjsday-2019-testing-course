# Testing with ReactDOM

Using React DOM for testing means rendering you React application the same way we to render a react application in a real browser, by calling `ReactDOM.render` with two arguments, a `React.Element` (JSX in most cases) and a `node` where to mount the application

a basic examples of an application that renders using ReactDOM

```
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => <h1>Hello!</h1>

test('render app', () => {
 const container = document.createElement('div')
 ReactDOM.render(<App />, container)
})
```

after the ReactDOM call we are able to make assertions of the content of the DOM by querying the `container` HTML node

for example we can test that inside the DOM there's now a `h1` with content `Hello!`

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

## When we make a mess, we have to clean!

In order for the React event system to work is **important** that the `container` element passed to `ReactDOM` get's appended to `document.body` (in React all event listens are attached to document)
the example above works for a simple scenario but if the component had any event handler declared it would not work

### What is correct way?

- when we want to render a component
  - create a container `div`
  - append this `div` to `document.body`
- when we completed the test
  - unmount the react application
  - clean the DOM

doing this inside every test would be not practible or fun, we can use Jest `beforeEach` and `afterEach` utilities to make it simpler

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

the `beforeEach` call creates a new `container` each time and appends it to `document.body`

the `afterEach` call will call `ReactDOM.unmountComponentAtNode(container)` which will trigger the unmount of components and `componentWillUnmount`,
removes the container from the DOM and set the variable back to null (should not be necessary due to `beforeEach` overriding it again, but this is to make sure nobody can read the state of the DOM as the time this this test was run by mistake)

## Testing a Stateful Component

```
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

#### `react-dom/test-utils`

`react-dom` offers a set of
utities found in the package `react-dom/test-utils` to help interacting with React applications in a DOM environment (eg simulating user actions)

in the previous example `ReactTestUtils.Simulate.click(button)` could be used instead of `dispatchEvent`

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
