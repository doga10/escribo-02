const CobrasEscadas = require('./domain/game')
const Player = require('./domain/player')
const calculator = require('./support/calculator')
const storage = require('./support/storage')

const player = new Player(calculator)

const game = new CobrasEscadas(player, storage, calculator)

game.jogar()