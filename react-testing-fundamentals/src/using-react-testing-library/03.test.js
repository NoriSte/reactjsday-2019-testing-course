import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

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

    const { container } = render(<Form onSubmit={onSubmit} />)

    const button = container.querySelector('button')
    fireEvent.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith('')

    const input = container.querySelector('input')

    fireEvent.change(input, { target: { value: 'pippo' } })
    fireEvent.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith('pippo')
  })
  test('will not call onSubmit prop function when form is disabled', () => {
    const onSubmit = jest.fn()
    const { getByText } = render(<Form onSubmit={onSubmit} disabled={true} />)

    const button = getByText('submit')
    fireEvent.click(button)

    expect(button).toBeDisabled()
    expect(onSubmit).toHaveBeenCalledTimes(0)
  })
  test('should show error if username is empty and form is submitted', () => {
    /* implement me */
  })

  test('should not trigger onSubmit if there are errors', () => {
    /* implement me */
  })
})
