'use strict'
const bcrypt = require('bcryptjs')

exports.encrypt = (text) => {
  return bcrypt.hashSync(text, 10)
}

exports.compare = (text, hash) => {
  return bcrypt.compareSync(text, hash)
}
