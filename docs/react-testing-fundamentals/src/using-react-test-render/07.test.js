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

describe('Form component', () => {
  test('default input value is empty', () => {
    const form = create(<Form></Form>)
    const root = form.root
    const input = root.findByType('input')
    expect(input.props.value).toBe('')
  })
  test('initialName gets passed to input as default value', () => {
    const form = create(<Form initialName="gino"></Form>)
    const root = form.root
    const input = root.findByType('input')
    expect(input.props.value).toBe('gino')
  })

  /**
   * in this test we have no proper way to update the form
   * we are just testing the props passing mechanism of react using attibutes in the JSX
   */
})
