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
    return <button onClick={this.handleClick}>{this.state.value}</button>
  }
}

describe('Button component', () => {
  test('check value', () => {
    const counter = create(<Counter />)
    const button = counter.root.findByType('button')
    expect(button.children).toEqual(['0'])
    button.props.onClick()
    expect(button.children).toEqual(['1'])

    /**
     * the test no longer depend on calling a
     * method on the class instance so we can now convert to using hooks
     *
     * notice: cannot update two times in a single act call
     */
  })
})
