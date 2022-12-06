'use strict'
require('dotenv').config()
const express = require('express')
const app = express()

// Error handling
const { handleFatalError } = require('./src/utils/handlerError')

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

// Static files
const path = require('path')
app.use('/', express.static(path.join(__dirname, 'public')))

// Middlewares
app.use(express.json())
app.use(require('./src/middleware/jwt'))

// Routes v1
const restV1 = require('./src/components/v1')
app.use(`/api/v1`, restV1)

module.exports = app
