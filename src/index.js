const express = require('express');
const route = require('./routes/index');
const db = require('./config/db');
const path = require('path');
const { auth } = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('express-async-errors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

db.connect();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {

    res.render('pages/index');
});

app.get('/register', function(req, res) {
    res.render('pages/register');
});

app.get('/login', function(req, res) {
    res.render('pages/login');
});

app.get('/error', function(req, res) {
    res.render('pages/error',{error:{ message: 123}});
});


route(app);


app.listen(3000, () => console.log('server is running in port 3000'));