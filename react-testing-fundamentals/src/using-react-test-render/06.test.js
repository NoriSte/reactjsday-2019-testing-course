import React from 'react'
import { create } from 'react-test-renderer'

function Form({ initialName }) {
  const [name, setName] = React.useState(initialName || '')

  return (
    <form>
      <label>
        name
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
      </label>
    </form>
  )
}

describe('App component', () => {
  test('Matches the snapshot', () => {
    const form = create(<Form />)
    expect(form.toJSON()).toMatchSnapshot()
  })

  /**
   * This is sometimes usefull but very fragile, what happens if we invert the order of the inputs?
   */
})
