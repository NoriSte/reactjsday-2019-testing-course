import React from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'

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

function Form({ onSubmit, disabled }) {
  const [username, setUsername] = React.useState('')
  return (
    <div>
      <label>
        username
        <input
          type="text"
          name="username"
          value={username}
          onChange={e => {
            setUsername(e.target.value)
          }}
        />
      </label>

      <button
        disabled={disabled}
        onClick={() => {
          onSubmit(username)
        }}
      >
        submit
      </button>
    </div>
  )
}

describe('Form', () => {
  test('will call onSubmit prop function when submit button is clicked passing username', () => {
    let savedName = ''
    let callCount = 0
    function onSubmit(name) {
      callCount += 1
      savedName = name
    }

    ReactDOM.render(<Form onSubmit={onSubmit} />, container)

    const button = container.querySelector('button')
    ReactTestUtils.Simulate.click(button)

    expect(callCount).toBe(1)
    expect(savedName).toBe('')

    const input = container.querySelector('input')

    input.value = 'pippo'
    ReactTestUtils.Simulate.change(input)
    ReactTestUtils.Simulate.click(button)

    expect(callCount).toBe(2)
    expect(savedName).toBe('pippo')
  })
  test('will not call onSubmit prop function when form is disabled', () => {
    let callCount = 0
    function onSubmit() {
      callCount += 1
    }
    ReactDOM.render(<Form onSubmit={onSubmit} disabled={true} />, container)

    const button = container.querySelector('button')
    ReactTestUtils.Simulate.click(button)

    expect(callCount).toBe(0)
  })
})
