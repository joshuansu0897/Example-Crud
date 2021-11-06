'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { handleFatalError } = require('./src/utils/utils')

const path = require('path')
app.use('/', express.static(path.join(__dirname, 'public')))

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

app.use(bodyParser.json())

const restV1 = require('./src/components/v1')

app.use(`/api/v1`, restV1)

module.exports = app