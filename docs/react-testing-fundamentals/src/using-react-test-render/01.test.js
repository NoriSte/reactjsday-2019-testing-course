/**
 * run by calling `npm test src/using-react-test-render/01.test.js`
 */

import React from 'react'
import TestRenderer from 'react-test-renderer'

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Hello</p>
    </div>
  )
}

function SubComponent() {
  return <p className="sub">Sub text</p>
}

const testRenderer = TestRenderer.create(<MyComponent />)
const testInstance = testRenderer.root

test('the name is not important in this case, but a call to test need to happen in order to jest to pick the file and make assertions', () => {
  expect(testInstance.findByType(SubComponent).props.foo).toBe('bar')
  expect(testInstance.findByProps({ className: 'sub' }).children).toEqual(['Sub text'])
})

/**
 * Key points:
 * - `TestRenderer.create`
 * - `TestRenderer.findByType`
 * - findByProps
 */
