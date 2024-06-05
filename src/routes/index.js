
require('express-async-errors')
const userRouter = require('./user')
const votingRouter = require('./voting')
function route(app){
   app.use('/user', userRouter);
   app.use('/voting', votingRouter);
}
module.exports = route