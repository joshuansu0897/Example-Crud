'use strict'

module.exports = {
  jwt: require('jsonwebtoken'),
  secret: process.env.JWT_SECRET,
}
