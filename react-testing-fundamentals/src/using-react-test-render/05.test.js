import React from 'react'
import { create } from 'react-test-renderer'
import { act } from 'react-test-renderer'

function Counter() {
  const [value, setValue] = React.useState(0)

  return <button onClick={e => setValue(value + 1)}>{value}</button>
}

describe('Button component', () => {
  test('check value', () => {
    let counter
    act(() => {
      counter = create(<Counter />)
    })

    const button = counter.root.findByType('button')
    expect(button.children).toEqual(['0'])
    act(() => {
      button.props.onClick()
    })
    expect(button.children).toEqual(['1'])
    act(() => {
      button.props.onClick()
    })
    act(() => {
      button.props.onClick()
    })
    expect(button.children).toEqual(['3'])

    /**
     * this is nicer, but we are still not working with the DOM
     * for example there are not events, we cannot
     * test a input change event to update the value
     */
  })
})
