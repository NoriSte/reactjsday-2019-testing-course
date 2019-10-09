# jsdom

Jest by default makes available an instance of [jsdom](https://github.com/jsdom/jsdom), A JavaScript implementation of the WHATWG DOM and HTML standards, for use with node.js.

## Window and Document Object

are available in the global scope

```js
test('window', () => {
  expect(window).toBeDefined() // true
  expect(window).not.toBeNull() // true
})
test('document', () => {
  expect(document).toBeDefined() // true
  expect(document).not.toBeNull() // true
})
test('body', () => {
  expect(document.body).toBeDefined() // true
  expect(document.body).not.toBeNull() // true
})
```

### Using Web APIs

```js
test('change document title', () => {
  expect(document.title).toBe('')

  document.title = 'my title'

  expect(document.title).toBe('my title')
  expect(document.querySelector('head > title').innerHTML).toBe('my title')
})
```

### Manipulating the DOM

We can manipulate the DOM as we were in the browser and make assertions of the results using common Web APIs

```js
test('button element in jsdom', () => {
  const button = document.createElement('button')
  button.innerText = 'click me'
  document.body.appendChild(button)
  const buttons = document.querySelectorAll('button')

  expect(buttons).toHaveLength(1) // true
  expect(buttons[0].innerText).toBe('click me') // true
})
```

### Interacting with the DOM

```js
test('click button element in jsdom', () => {
  const button = document.createElement('button')
  button.innerText = 'click me'
  document.body.appendChild(button)
  const buttons = document.querySelectorAll('button')

  expect(buttons).toHaveLength(1) // true
  expect(buttons[0].innerText).toBe('click me') // true

  buttons[0].addEventListener('click', e => {
    e.target.innerText = 'clicked'
  })

  expect(buttons[0].innerText).not.toBe('clicked') //true

  buttons[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))

  expect(buttons[0].innerText).toBe('clicked') // true
})
```

this is the foundation of testing using libraries such as [`react-dom/test-utils`](https://it.reactjs.org/docs/test-utils.html) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro) that expect to have a DOM available.

## Things to be aware of

- every file have a different jsdom instance
- the same jsdom instance (so the Window) is shared by **all** tests in a file, this can cause some tests to behave differently when run in isolation of after other tests that manipulate the DOM
  - to avoid such kind of problems refer to [the section about jest-lifecycle](jest-lifecycle.md) to understand how to properly clean the test environment on each test run

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
