require('express-async-errors')
const { auth } = require('../middleware/auth');
const userRouter = require('./user')
const votingRouter = require('./voting')
const viewRouter = require('./view')
function route(app){
   app.use('/user', userRouter);
   app.use('/voting', auth, votingRouter);
   app.use('/', viewRouter);
}
module.exports = route