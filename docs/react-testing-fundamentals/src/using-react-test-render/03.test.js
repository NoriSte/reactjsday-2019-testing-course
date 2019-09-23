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
    return <button>{this.state.value}</button>
  }
}

describe('Button component', () => {
  test('check value', () => {
    const counter = create(<Counter />)
    const instance = counter.getInstance()
    const button = counter.root.findByType('button')
    expect(button.children).toEqual(['0'])
    instance.handleClick()
    expect(button.children).toEqual(['1'])

    /**
     * This test passes but it's still actually useless
     *  is testing the value button visible value
     *  but is still calling a method the class
     *  and we are not even attaching the click handler to the button!
     *  a user would never be able to click on it to increase
     *
     *  another drowback is that calling the instance directly we would not able to use
     *  a Functional component that uses useState Hooks because there is not instance to read methods from
     */
  })
})
