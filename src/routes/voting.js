const express = require('express')
const router = express.Router()
require('express-async-errors')

const {listVoting} = require('../controllers/voting')

router.get('/', listVoting)

module.exports = router;