const express = require('express')
const router = express.Router()
const conn = require('../util/sql')
const jwt = require('jsonwebtoken')
router.use(express.urlencoded())


module.exports = router
