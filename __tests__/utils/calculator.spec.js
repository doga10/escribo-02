const calculator = require('../../support/calculator')

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = floor <= ceiling
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false
      }
    }
  }
})

test('should return a number between 1 to 6', () => {
  expect(calculator.random()).toBeWithinRange(1, 6)
})

test('should return an array of integers with 2 positions, between 1 to 6', () => {
  const result = calculator.randomValues()
  expect(result.length).toBe(2)
  expect(result[0]).toBeWithinRange(1, 6)
  expect(result[1]).toBeWithinRange(1, 6)
})

test('should return the sum of the array', () => {
  expect(calculator.sum([1, 2])).toBe(3)
  expect(calculator.sum([])).toBe(0)
})