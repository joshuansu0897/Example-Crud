'use strict'
const lib = require('./lib')

module.exports = (req, res, next) => {
  if (req.url.includes('/api/v1/auth')) {
    next()
    return
  }

  let token = req.headers['authorization']

  if (!token) {
    res.status(401)
    res.json({ msg: 'No token!' })
    return
  }

  token = token.replace('Bearer ', '')

  try {
    req.user = lib.jwt.verify(token, lib.secret)
    next()
  } catch (error) {
    console.log(error)
    res.status(401)
    res.json({ msg: 'Failed to authenticate token!' })
  }
}
