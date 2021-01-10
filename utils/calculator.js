class Calculator {
	random() {
    return Math.floor(Math.random() * (6 - 1 + 1)) + 1
  }

  randomValues() {
    return [this.random(), this.random()]
	}
	
	sum(array) {
    return array.reduce((acc, cur) => ( acc += cur ), 0)
  }
}

module.exports = new Calculator()