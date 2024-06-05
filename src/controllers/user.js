const {createUser} = require('../services/user');

const register = async (req,res) =>{
   const user = await createUser(req);
   console.log(user);
   res.json({me: 'success'})
}

module.exports = { register}