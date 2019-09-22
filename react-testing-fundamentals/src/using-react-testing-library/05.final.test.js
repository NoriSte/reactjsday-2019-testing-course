import React, { useEffect } from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

function Form({ onSubmit, disabled }) {
  const [username, setUsername] = React.useState('')
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = React.useState(null)
  const formRef = React.useRef()

  useEffect(() => {
    function handler(e) {
      if (e.key === 'Enter') {
        formRef.current.dispatchEvent(new Event('submit'))
      }
    }
    window.addEventListener('keydown', handler)

    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (pristine) {
      return
    }

    const valid = validate()
    if (valid) {
      setError(null)
    }
  }, [pristine, username, validate])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function validate() {
    let isValid = true

    if (username === '') {
      isValid = false
      setError('username cannot be empty')
    }

    return isValid
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (pristine) {
      setPristine(false)
    }
    const valid = validate()
    if (valid) {
      onSubmit(username)
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      {error ? <div data-testid="error-message">{error}</div> : null}
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

      <button type="submit" disabled={disabled}>
        submit
      </button>
    </form>
  )
}

describe('Form', () => {
  test('will call onSubmit prop function when submit button is clicked passing username', () => {
    const onSubmit = jest.fn()

    const { getByText, getByLabelText } = render(<Form onSubmit={onSubmit} />)

    const button = getByText('submit')
    const input = getByLabelText('username')

    fireEvent.change(input, { target: { value: 'pippo' } })
    fireEvent.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(1)
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
  test('should show error if username is empty and form try to submit', () => {
    const onSubmit = jest.fn()
    const { getByLabelText, getByText, getByTestId, queryByTestId } = render(<Form onSubmit={onSubmit} />)

    expect(queryByTestId('error-message')).not.toBeInTheDocument()

    const button = getByText('submit')
    fireEvent.click(button)

    const usernameInput = getByLabelText('username')

    expect(usernameInput.value).toBe('')
    expect(getByTestId('error-message')).toHaveTextContent('username cannot be empty')
    expect(onSubmit).not.toHaveBeenCalled()

    // should remove effor if input becomes valid
    fireEvent.change(usernameInput, { target: { value: 'pino' } })
    expect(usernameInput.value).toBe('pino')
    expect(queryByTestId('error-message')).not.toBeInTheDocument()

    fireEvent.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith('pino')
  })

  test('pressing Enter should submit', () => {
    const onSubmit = jest.fn()

    const { getByLabelText } = render(<Form onSubmit={onSubmit} />)

    const usernameInput = getByLabelText('username')
    fireEvent.change(usernameInput, { target: { value: 'pino' } })

    fireEvent.keyDown(document, { key: 'Enter', code: 13 })
    expect(onSubmit).toHaveBeenLastCalledWith('pino')
  })
})
