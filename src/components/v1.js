'use strict'
const router = require('express').Router()

const users = require('./users')
const posts = require('./posts')

router.use(`/users`, users.controller)
router.use(`/posts`, posts.controller)

module.exports = router