const express = require('express');
const router = express.Router();
require('express-async-errors');

const {voting, sendC, sig, getSig } = require('../controllers/voting');

router.post('/', voting);
router.post('/sendC', sendC);
router.post('/sig', sig);
router.get('/getSig', getSig);


module.exports = router;