const { join } = require('path')
const fs = require('fs')
const chalk = require('chalk')

const db = join(__dirname, '..', 'data', 'data.json')

let players = {
  'player01': [],
  'player02': []
}

const random = () => (Math.floor(Math.random() * (6 - 1 + 1)) + 1)

const randomValues = () => ([random(), random()])

const sum = (array) => (array.reduce((acc, cur) => ( acc += cur ), 0))

const appendRound = (name, value) => {
  players[name].push(value)
  return players
}

const playerValue = (name) => {
  return sum(players[name])
}

const readJSON = () => {
  const data = fs.existsSync(db) ? fs.readFileSync(db) : []
  try {
    return JSON.parse(data)
  } catch (e) {
    return []
  }
}

const gameRules = (name, value) => {
  appendRound(name, value)
  const playerPosition = playerValue(name)
  const json = readJSON()
  const [ ladderIndex ] = json.ladder.filter(obj => Object.keys(obj)[0] === playerPosition.toString())
  const [ snakeIndex ] = json.snake.filter(obj => Object.keys(obj)[0] === playerPosition.toString())
  if (ladderIndex) {
    appendRound(name, Math.abs(playerPosition - Object.values(ladderIndex)[0]))
  }
  if (snakeIndex) {
    appendRound(name, -Math.abs(playerPosition - Object.values(snakeIndex)[0]))
  }

  const position = playerValue(name)
  console.log(`${chalk.green(`Player ${name} is in position: ${position}`)}`)
  
  return position
}

const dice = (name) => {
  const result = randomValues()
  if (result[0] === result[1]) {
    dice()
    console.log(`${chalk.blue(`Player ${name} can play again! dice01: ${result[0]}, dice02: ${result[1]}`)}`)
  }

  const resolve = sum(result)
  return gameRules(name, resolve)
}

// dice('player01')
// dice('player02')
// dice('player01')
// dice('player02')
// dice('player01')
// dice('player02')
// dice('player01')
// dice('player02')
// dice('player01')
// dice('player02')

module.exports = { random, randomValues, sum, appendRound, playerValue, readJSON, gameRules, dice }