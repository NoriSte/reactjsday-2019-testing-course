import { randomNumberInRange, buildSeats } from './util'

test('randomNumberInRange', () => {
  // expect(randomNumberInRange(min, max)).toBeGreaterThanOrEqual(min)
  // expect(randomNumberInRange(min, max)).toBeGreaterThanOrEqual(max)
})

test('buildSeats', () => {
  expect(buildSeats(2, 3)).toMatchInlineSnapshot(`
    Array [
      Array [
        0,
        0,
        0,
      ],
      Array [
        0,
        0,
        0,
      ],
    ]
  `)
})
