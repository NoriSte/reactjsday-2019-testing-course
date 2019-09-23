test('chec for jsdom', () => {
  expect(window).toBeDefined()
  expect(document).toBeDefined()
})

test('append to global document 1', () => {
  const element = document.createElement('div')
  expect(element).not.toBeNull()
  document.body.appendChild(element)
})

test('append to global document 2', () => {
  const element = document.createElement('div')
  expect(element).not.toBeNull()
  document.body.appendChild(element)
})

test('append to global document 3', () => {
  const element = document.createElement('div')
  document.body.appendChild(element)
})

test('check document is shared by tests', () => {
  expect(document.body.childElementCount).toBe(3)
})
