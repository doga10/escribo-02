class Player {
  players = {
    player01: [],
    player02: []
  }

  constructor(calculator) {
    this.calculator = calculator
  }

  playerValue(name) {
    return this.calculator.sum(this.players[name])
  }

  appendRound(name, value) {
    this.players[name].push(value);  
    return this.players
  }
}

module.exports = Player