import React from 'react'
import { create } from 'react-test-renderer'
import { act } from 'react-test-renderer'

function Counter() {
  const [value, setValue] = React.useState(0)

  return <button onClick={() => setValue(value + 1)}>{value}</button>
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
  })
})
