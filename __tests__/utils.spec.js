const { random, randomValues, sum, appendRound } = require('../utils/main')

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  }
})

test('should return a number between 1 to 6', () => {
  expect(random()).toBeWithinRange(1, 6)
})

test('should return an array of integers with 2 positions, between 1 to 6', () => {
  const result = randomValues()
  expect(result.length).toBe(2)
  expect(result[0]).toBeWithinRange(1, 6)
  expect(result[1]).toBeWithinRange(1, 6)
})

test('should return the sum of the array', () => {
  expect(sum([1, 2])).toBe(3)
  expect(sum([])).toBe(0)
})

test('should return the sum of the array', () => {
  expect(appendRound('player01', 10)).toEqual({
    'player01': [10],
    'player02': []
  })
  expect(appendRound('player02', 20)).toEqual({
    'player01': [10],
    'player02': [20]
  })
})