const { random, randomValues, sum, appendRound, playerValue, readJSON, gameRules, dice } = require('../utils/main')

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
  expect(appendRound('player01', -10)).toEqual({
    'player01': [10, -10],
    'player02': [20]
  })
  expect(appendRound('player02', -20)).toEqual({
    'player01': [10, -10],
    'player02': [20, -20]
  })
})

test('should return the sum of the value of the informed player', () => {
  appendRound('player01', 20)
  expect(playerValue('player01')).toEqual(20)
  appendRound('player01', 50)
  expect(playerValue('player01')).toEqual(70)
  expect(playerValue('player02')).toEqual(0)
  appendRound('player01', -70)
  expect(playerValue('player01')).toEqual(0)
})

test('should read the data.json file from the data directory', () => {
  expect(readJSON()).toBeTruthy()
})

test('should return the player current position', () => {
  expect(gameRules('player01', 16)).toEqual(6)
  expect(gameRules('player01', 2)).toEqual(31)
  expect(gameRules('player01', 5)).not.toEqual(31)
  appendRound('player01', -36)
})

test('should play the game', () => {
  expect(dice('player01')).toBeWithinRange(2, 12)
})