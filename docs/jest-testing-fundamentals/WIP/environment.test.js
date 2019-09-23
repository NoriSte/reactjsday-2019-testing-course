/**
 * @jest-environment node
 */

test('use jsdom in this test file', () => {
  expect(typeof window).toBe('undefined')
  expect(typeof document).toBe('undefined')
})
