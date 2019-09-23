import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function Counter() {
  const [value, setValue] = React.useState(0)

  return <button onClick={() => setValue(value + 1)}>{value}</button>
}

describe('Counter Button', () => {
  test('show value', () => {
    const container = document.createElement('div')

    ReactDOM.render(<Counter />, container)
    const button = container.querySelector('button')
    expect(button.textContent).toBe('0')

    /**
     * Where does document come from?
     * who is it's parent?  console.log(container.parentElement)
     */
  })
})
