# jsdom

Jest by default makes available an instance of [jsdom](https://github.com/jsdom/jsdom), A JavaScript implementation of the WHATWG DOM and HTML standards, for use with node.js

## window and document object

are available in the global scope

```
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

### using web api

```

test('change document title', () => {
expect(document.title).toBe('')

document.title = 'my title'

expect(document.title).toBe('my title')
expect(document.querySelector('head > title').innerHTML).toBe('my title')
})

```

### manipulating with the DOM

we can manipulate the dom as we were in the borwser and make assertions of the results using common web api

```

test('button element in jsdom', () => {
const button = document.createElement('button')
button.innerText = 'click me'
document.body.appendChild(button)
const buttons = document.querySelectorAll('button')

expect(buttons).toHaveLength(1) // true
expect(buttons[0].innerText).toBe('click me') // true
})

```

### interacting with the DOM

```

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

this is the foundation of testing using libraries such as `react-dom/test-utils` and `react-testing-library` that expect to ha ve a DOM available
