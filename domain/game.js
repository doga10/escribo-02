const chalk = require('chalk')
const logger = require('../support/logger')

class CobrasEscadas {

  constructor(player, storage, calculator) {
    this.player = player
    this.storage = storage
    this.calculator = calculator
    this.isPlayer = true
  }

  gameRules(name, value) {
    this.player.appendRound(name, value)
    const playerPosition = this.player.playerValue(name)
    const json = this.storage.readJSON()
    const [ ladderIndex ] = json.ladder.filter(obj => Object.keys(obj)[0] === playerPosition.toString())
    const [ snakeIndex ] = json.snake.filter(obj => Object.keys(obj)[0] === playerPosition.toString())
    if (ladderIndex) {
      logger.consoleRed(name, 'skips', Math.abs(playerPosition - Object.values(ladderIndex)[0]))
      this.player.appendRound(name, Math.abs(playerPosition - Object.values(ladderIndex)[0]))
    }
    if (snakeIndex) {
      logger.consoleRed(name, 'back', -Math.abs(playerPosition - Object.values(snakeIndex)[0]))
      this.player.appendRound(name, -Math.abs(playerPosition - Object.values(snakeIndex)[0]))
    }
  
    const position = this.player.playerValue(name)
    logger.consoleGreen(name, position)
    
    return position
  }

  dice(name) {
    const result = this.calculator.randomValues()
    const playerPosition = this.player.playerValue(name)
    if (result[0] === result[1] && playerPosition !== 100) {
      logger.consoleRedBright(name, result)
      this.dice(name)
    }
  
    const resolve = this.calculator.sum(result)
    return this.gameRules(name, resolve)
  }
  
  condition() {
    let position = this.dice(this.isPlayer ? 'player01' : 'player02')
    this.isPlayer = !this.isPlayer
    if (position === 100) {
      return `Player ${!this.isPlayer ? 'player01' : 'player02'} winner!`
    } else if (position > 100) {
      this.player.appendRound(!this.isPlayer ? 'player01' : 'player02', -((position - 100) * 2))
      position = this.player.playerValue(!this.isPlayer ? 'player01' : 'player02') 
      return position
    }
    return position
  }
  
  jogar() {
    let isCondition = true
    while (isCondition) {
      const response = this.condition()
      if ('string' === typeof response) {
        console.log(response)
        isCondition = false
        break
      }
    }
  }
}

module.exports = CobrasEscadas