'use strict'
const router = require('express').Router()
const User = require('./dal')
const encryption = require('../../../utils/encryption')
const utils = require('../../../utils/utils')
const { jwt, secret } = require('../../../middleware/jwt/lib')

router.post('/signup', async (req, res) => {

  let user = {
    email: req.body.email,
    username: req.body.username,
    password: encryption.encrypt(req.body.password)
  }

  if (utils.isEmptyObj(user)) {
    res.status(400)
    res.json({ msg: 'Missign arguments on body' })
    return
  }

  let response = await User.save(user)

  res.json(response)
})

router.post('/signin', async (req, res) => {
  let opts = {
    username: req.body.username,
    email: req.body.email
  }

  const user = await User.findBy(utils.CleaningEmptyObj(opts))

  if (!user) {
    res.status(404)
    res.json({ error: 'User Not Found' })
    return
  }

  const validPassword = encryption.compare(req.body.password, user.password)

  if (!validPassword) {
    res.status(404)
    res.json({ error: 'Invalid password' })
    return
  }

  const token = jwt.sign({ id: user.id }, secret, { expiresIn: '24h' })

  res.json({ token })
})

module.exports = router