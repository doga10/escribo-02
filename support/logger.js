const chalk = require('chalk')

class Logger {
  consoleRed(name, condition, value) {
    console.log(`${chalk.red(`Player ${name} ${condition} ${value} houses`)}`)
  }

  consoleGreen(name, position) {
    console.log(`${chalk.green(`Player ${name} is in position: ${position}`)}`)
  }

  consoleRedBright(name, result) {
    console.log(`${chalk.redBright(`Player ${name} rotated the data again: ${result[0]} ${result[1]}`)}`)
  }
}

module.exports = new Logger()