const express = require('express')
const router = express.Router()
require('express-async-errors')
const { register, login, createCandidate ,endVoting} = require('../controllers/user');
const { auth,authorize } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/create', auth,authorize(['admin']) , createCandidate);
router.post('/end', auth, authorize(['admin']) , endVoting);

module.exports = router