'use strict'

const express = require('express')
const { query, validationResult } = require('express-validator/check')

const app = express()

app.get('/', [
  query('email').isEmail().withMessage('must be valid'),
  query('name').isAscii().withMessage('must be ASCII')
], function (req, res, next) {
  try {
    validationResult(req).throw()
  } catch (err) {
    return res.status(422).json({ errors: err.mapped() })
  }
  next()
}, function (req, res, next) {
  res.status(200).json({
    email: req.query.email,
    name: req.query.name
  })
})

app.listen(3000, function () {
  console.log('Listening on port 3000')
})
