const CobrasEscadas = require('../../domain/game')
const Player = require('../../domain/player')
const calculator = require('../../utils/calculator')
const storage = require('../../utils/storage')

const player = new Player(calculator)
const game = new CobrasEscadas(player, storage, calculator)

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

test('should return the player current position', () => {
  expect(game.gameRules('player01', 16)).toEqual(6)
  expect(game.gameRules('player01', 2)).toEqual(31)
  expect(game.gameRules('player01', 5)).not.toEqual(31)
  player.appendRound('player01', -36)
})

test('should play the game', () => {
  expect(game.dice('player01')).toBeWithinRange(2, 12)
})

test('should return position', () => {
  expect(game.condition()).toBeWithinRange(1, 50)
})

test('should init game', () => {
  expect(game.jogar()).toBe(undefined)
})