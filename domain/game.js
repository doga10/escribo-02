const chalk = require('chalk')

class Game {

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
      console.log(`${chalk.red(`Player ${name} skips ${Math.abs(playerPosition - Object.values(ladderIndex)[0])} houses`)}`)
      this.player.appendRound(name, Math.abs(playerPosition - Object.values(ladderIndex)[0]))
    }
    if (snakeIndex) {
      console.log(`${chalk.red(`Player ${name} back ${-Math.abs(playerPosition - Object.values(snakeIndex)[0])} houses`)}`)
      this.player.appendRound(name, -Math.abs(playerPosition - Object.values(snakeIndex)[0]))
    }
  
    const position = this.player.playerValue(name)
    console.log(`${chalk.green(`Player ${name} is in position: ${position}`)}`)
    
    return position
  }

  dice(name, position) {
    const result = this.calculator.randomValues()
    if (result[0] === result[1] && position !== 100) {
      console.log(`${chalk.redBright(`Player ${name} rotated the data again: ${result[0]} ${result[1]}`)}`)
      this.dice(name, position)
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

module.exports = Game