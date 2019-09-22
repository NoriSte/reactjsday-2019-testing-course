import React from 'react'
import { create } from 'react-test-renderer'

class Counter extends React.Component {
  state = {
    value: 0,
  }

  handleClick = () => {
    this.setState({ value: this.state.value + 1 })
  }

  render() {
    return <button>this.state.value</button>
  }
}

describe('Button component', () => {
  test('update counter', () => {
    const counter = create(<Counter />)
    const instance = counter.getInstance()
    expect(instance.state.value).toBe(0)
    instance.handleClick()
    expect(instance.state.value).toBe(1)

    /**
     * This test passes but it's actually useless
     *  is testing the value in the state
     *  and that calling a method the state increases
     *  but we are not even using it
     *  we are just testing React's own setState this way
     */
  })
})
