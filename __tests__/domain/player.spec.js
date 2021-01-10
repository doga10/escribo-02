const calculator = require('../../support/calculator')
const Player = require('../../domain/player')

const player = new Player(calculator)

test('should return the sum of the array', () => {
  expect(player.appendRound('player01', 10)).toEqual({
    'player01': [10],
    'player02': []
  })
  expect(player.appendRound('player02', 20)).toEqual({
    'player01': [10],
    'player02': [20]
  })
  expect(player.appendRound('player01', -10)).toEqual({
    'player01': [10, -10],
    'player02': [20]
  })
  expect(player.appendRound('player02', -20)).toEqual({
    'player01': [10, -10],
    'player02': [20, -20]
  })
})

test('should return the sum of the value of the informed player', () => {
  player.appendRound('player01', 20)
  expect(player.playerValue('player01')).toEqual(20)
  player.appendRound('player01', 50)
  expect(player.playerValue('player01')).toEqual(70)
  expect(player.playerValue('player02')).toEqual(0)
  player.appendRound('player01', -70)
  expect(player.playerValue('player01')).toEqual(0)
})