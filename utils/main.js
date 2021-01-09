const players = {
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

// const dice = () => {
//   const result = randomValues()
//   if (result[0] === result[1]) {
//     dice()
//   }

//   return sum(result)
// }

module.exports = { random, randomValues, sum, appendRound }