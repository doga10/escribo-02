const { join } = require('path')
const fs = require('fs')
const chalk = require('chalk')

const db = join(__dirname, '..', 'data', 'data.json')

const players = {
  player01: [],
  player02: []
}

class CobrasEscadas {
  

  
}

// playerValue(name) {
//   return sum(players[name])
// }

// const random = () => (Math.floor(Math.random() * (6 - 1 + 1)) + 1)

// const randomValues = () => ([random(), random()])

// const sum = (array) => (array.reduce((acc, cur) => ( acc += cur ), 0))

// const appendRound = (name, value) => {
//   players[name].push(value);  
//   return players
// }

// const playerValue = (name) => {
//   return sum(players[name])
// }

// const readJSON = () => {
//   const data = fs.existsSync(db) ? fs.readFileSync(db) : []
//   try {
//     return JSON.parse(data)
//   } catch (e) {
//     return []
//   }
// }

// const gameRules = (name, value) => {
//   appendRound(name, value)
//   const playerPosition = playerValue(name)
//   const json = readJSON()
//   const [ ladderIndex ] = json.ladder.filter(obj => Object.keys(obj)[0] === playerPosition.toString())
//   const [ snakeIndex ] = json.snake.filter(obj => Object.keys(obj)[0] === playerPosition.toString())
//   if (ladderIndex) {
//     console.log(`${chalk.red(`Player ${name} skips ${Math.abs(playerPosition - Object.values(ladderIndex)[0])} houses`)}`)
//     appendRound(name, Math.abs(playerPosition - Object.values(ladderIndex)[0]))
//   }
//   if (snakeIndex) {
//     console.log(`${chalk.red(`Player ${name} back ${-Math.abs(playerPosition - Object.values(snakeIndex)[0])} houses`)}`)
//     appendRound(name, -Math.abs(playerPosition - Object.values(snakeIndex)[0]))
//   }

//   const position = playerValue(name)
//   console.log(`${chalk.green(`Player ${name} is in position: ${position}`)}`)
  
//   return position
// }



// module.exports = { random, randomValues, sum, appendRound, playerValue, readJSON, gameRules, dice, jogar }