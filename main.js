const Game = require('./domain/game')
const Player = require('./domain/player')
const calculator = require('./utils/calculator')
const storage = require('./utils/storage')

const player = new Player(calculator)

const game = new Game(player, storage, calculator)

game.jogar()