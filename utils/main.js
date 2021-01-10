const { join } = require('path')
const fs = require('fs')
const chalk = require('chalk')

const db = join(__dirname, '..', 'data', 'data.json')

const MAX_POSITION = 112

const players = {
  player01: [],
  player02: []
}

const random = () => (Math.floor(Math.random() * (6 - 1 + 1)) + 1)

const randomValues = () => ([random(), random()])

const sum = (array) => (array.reduce((acc, cur) => ( acc += cur ), 0))

const appendRound = (name, value) => {
  players[name].push(value);  
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
    console.log(name, "escada", Math.abs(playerPosition - Object.values(ladderIndex)[0]))
    appendRound(name, Math.abs(playerPosition - Object.values(ladderIndex)[0]))
  }
  if (snakeIndex) {
    console.log(name, "cobra", -Math.abs(playerPosition - Object.values(snakeIndex)[0]))
    appendRound(name, -Math.abs(playerPosition - Object.values(snakeIndex)[0]))
  }

  const position = playerValue(name)
  console.log(`${chalk.green(`Player ${name} is in position: ${position}`)}`)
  
  return position
}

const dice = (name, position) => {
  const result = randomValues()
  if (result[0] === result[1] && position !== 100) {
    console.log(name, result[0], result[1], sum(result))
    dice(name, position)
  }

  const resolve = sum(result)
  console.log(name, result, resolve)
  return gameRules(name, resolve)
}

let isPlayer = true
const condition = () => {
  let position = dice(isPlayer ? 'player01' : 'player02')
  isPlayer = !isPlayer
  if (position === 100) {
    return `Player ${isPlayer ? 'player01' : 'player02'} winner!`
  } else if (position > 100) {
    appendRound(!isPlayer ? 'player01' : 'player02', -((position - 100) * 2))
    position = playerValue(!isPlayer ? 'player01' : 'player02') 
    return position
  }
  return position
}

const jogar = () => {
  let isCondition = true
  while (isCondition) {
    const response = condition()
    console.log(response)
    if ('string' === typeof response) {
      isCondition = false
      break
    }
  }
}

module.exports = { random, randomValues, sum, appendRound, playerValue, readJSON, gameRules, dice, jogar }