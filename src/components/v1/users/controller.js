'use strict'
const router = require('express').Router()
const User = require('./dal')
const utils = require('../../utils/utils')
const encryption = require('../../utils/encryption')

router.get('/', async (req, res) => {
  let response = await User.getAll()
  res.json(response)
})

router.post('/', async (req, res) => {

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

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  let response = await User.findById(id)
  res.json(response)
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)

  let user = {
    id,
    email: req.body.email,
    username: req.body.username,
    password: encryption.hash(req.body.password)
  }

  let response = await User.save(user)

  res.json(response)
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)

  let response = await User.deleteById(id)
  res.json(response)
})

module.exports = router