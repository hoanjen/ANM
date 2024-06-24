const express = require('express');
const route = require('./routes/index');
const db = require('./config/db');
const path = require('path');
const { auth } = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('express-async-errors');

const app = express();

db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
app.use(cookieParser());


route(app);


app.listen(3000, () => console.log('http://localhost:3000'));