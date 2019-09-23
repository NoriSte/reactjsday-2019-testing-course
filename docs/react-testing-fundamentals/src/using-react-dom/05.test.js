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

function Form() {
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

      <button>submit</button>
    </div>
  )
}

describe('Form', () => {
  test('will call onSubmit prop function when submit button is clicked passing username', () => {
    function onSubmit() {}
    ReactDOM.render(<Form onSubmit={onSubmit} />, container)

    /** implement me */
  })
  test('will not call onSubmit prop function when form is disabled', () => {
    function onSubmit() {}
    ReactDOM.render(<Form onSubmit={onSubmit} disabled={true} />, container)

    /** implement me */
  })
})
