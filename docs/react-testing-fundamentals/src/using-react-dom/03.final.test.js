import React from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'

let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

function Counter() {
  const [value, setValue] = React.useState(0)

  function clickHanler() {
    console.log('click handler called!')
    setValue(value + 1)
  }

  return <button onClick={clickHanler}>{value}</button>
}

describe('Counter Button', () => {
  test('show value', () => {
    ReactDOM.render(<Counter />, container)
    const button = container.querySelector('button')
    expect(button.textContent).toBe('0')
  })

  test('update value', () => {
    console.log(document.body.innerHTML)
    ReactDOM.render(<Counter />, container)
    const button = container.querySelector('button')
    expect(button.textContent).toBe('0')
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(button.textContent).toBe('1')
  })
})
