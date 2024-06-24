const express = require('express')
const router = express.Router()
require('express-async-errors')
const { auth, authorize } = require('../middleware/auth');
const {listVoting,voting, listVotingAdmin,sendC, sig, getSig, listResult} = require('../controllers/voting');

router.get('/register', function(req, res) {
    res.render('pages/register');
});

router.get('/createVoting', auth, authorize(['admin']), function(req, res) {
    res.render('pages/createVoting', {user: req.user});
});

router.get('/login', function(req, res) {
    res.render('pages/login');
});

router.get('/error', function(req, res) {
    res.render('pages/error',{error:{ message: 123}});
});

router.get('/', auth, function(req, res) {
    res.render('pages/index',{user: req.user});
});

router.get('/voting/result',auth, listResult);

router.get('/voting',auth, authorize(['user']), listVoting);

router.get('/voting/admin', auth, authorize(['admin']), listVotingAdmin);

module.exports = router