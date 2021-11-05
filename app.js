'use strict'
const app = require('express')()
const bodyParser = require('body-parser')
const { handleFatalError } = require('./src/utils/utils')

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

app.use(bodyParser.json())

const users = require('./src/components/users')
const posts = require('./src/components/posts')

app.use(`/users`, users.controller)
app.use(`/posts`, posts.controller)

module.exports = app