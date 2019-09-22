import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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
    const container = document.createElement('div')

    ReactDOM.render(<Counter />, container)
    const button = container.querySelector('button')
    expect(button.textContent).toBe('0')
  })

  test('update value', () => {
    const container = document.createElement('div')

    ReactDOM.render(<Counter />, container)
    const button = container.querySelector('button')
    expect(button.textContent).toBe('0')

    // DECOMMENT THESE
    // button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    // expect(button.textContent).toBe('1')
    /**
     * event is being dispatched but handler not called, why?
     */
  })
})
