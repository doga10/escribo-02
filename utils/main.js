const random = () => (Math.floor(Math.random() * (6 - 1 + 1)) + 1)

const randomValues = () => ([random(), random()])

const sum = (array) => (array.reduce((acc, cur) => ( acc += cur ), 0))

module.exports = { random, randomValues, sum }