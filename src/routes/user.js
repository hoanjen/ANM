const express = require('express')
const router = express.Router()
require('express-async-errors')
const { register } = require('../controllers/user')

router.post('/register', register);

module.exports = router