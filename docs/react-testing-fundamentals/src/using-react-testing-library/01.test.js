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
    const onSubmit = jest.fn()

    ReactDOM.render(<Form onSubmit={onSubmit} />, container)

    const button = container.querySelector('button')
    ReactTestUtils.Simulate.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith('')

    const input = container.querySelector('input')

    input.value = 'pippo'
    ReactTestUtils.Simulate.change(input)
    ReactTestUtils.Simulate.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith('pippo')
  })
  test('will not call onSubmit prop function when form is disabled', () => {
    const onSubmit = jest.fn()
    ReactDOM.render(<Form onSubmit={onSubmit} disabled={true} />, container)

    const button = container.querySelector('button')
    ReactTestUtils.Simulate.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(0)
  })
})

/**
 * convert working component to use react-testing-library
 */
