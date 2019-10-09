# Rendering using `react-testing-library`

Using [`react-dom`](https://reactjs.org/docs/react-dom.html) we have code like this to test a react component

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

/* ######## setup code above ######## */

function App() {
  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
}

test("render app", () => {
  ReactDOM.render(<App />, container);
  expect(document.querySelector("h1").textContent).toBe("Hello!");
});
```

### Rendering

when using [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro) we can start by importing [`render`](https://reactjs.org/docs/react-dom.html#render) and use it instead of ReactDOM

```diff
  import React from 'react'
  import ReactDOM from 'react-dom'
+ import { render } from '@testing-library/react'

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

  /* ######## setup code above ######## */

  function App() {
    return (
      <div>
        <h1>Hello!</h1>
      </div>
    )
  }

  test('render app', () => {
-   ReactDOM.render(<App />, container)
+   render(<App />)
    expect(document.querySelector('h1').textContent).toBe('Hello!')
  })
```

### Automatic cleanup

You may notice that `render` doesn't require us to pass a container (nor to add anything to `document.body` anymore) then, we can remove the setup and teardown blocks

> note: in old tutorials you may see import of `react-testing-library/cleanup` this is no longer required as the `beforeEach` and `afterEach` are automatically registered now

```diff
  import React from 'react'
- import ReactDOM from 'react-dom'
  import { render } from '@testing-library/react'
-
- let container = null
- beforeEach(() => {
-   // setup a DOM element as a render target
-   container = document.createElement('div')
-   document.body.appendChild(container)
- })
-
- afterEach(() => {
-   // cleanup on exiting
-   ReactDOM.unmountComponentAtNode(container)
-   container.remove()
-   container = null
- })
-
- /* ######## setup code above ######## */

  function App() {
    return (
      <div>
        <h1>Hello!</h1>
      </div>
    )
  }

  test('render app', () => {
    render(<App />)
    expect(document.querySelector('h1').textContent).toBe('Hello!')
  })
```

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
