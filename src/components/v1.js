'use strict'
const router = require('express').Router()

const users = require('./users')
const posts = require('./posts')
const auth = require('./auth')

router.use(`/users`, users.controller)
router.use(`/posts`, posts.controller)
router.use(`/auth`, auth.controller)

module.exports = router