'use strict'
const chalk = require('chalk')

exports.handleFatalError = (err) => {
  console.error(`${chalk.red('[FATAL ERROR]')} ${err}`)
  console.error(err.stack)
  process.exit(1)
}

exports.handleError = (err) => {
  console.error(`${chalk.red('[ERROR]')} ${err}`)
  console.error(err.stack)
}
