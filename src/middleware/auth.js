
const tokenService = require('../services/token');

const httpStatus = require("http-status");
const jwt = require('jsonwebtoken')
require('dotenv').config();




const auth = async (req,res, next) => {
   const token = req.cookies.token;

   if(!token) {
      console.log('no token')
      req.user = null;
      return next();
   }
   const payload = jwt.verify(token, process.env.secret);
   const user = await User.findById(payload.id).lean();
   if (!user) {
      console.log('token khon hop le');
      req.user = null;
      return next();
   };
   req.user = user;
   next();
}

const authorize = (rolesAllow = []) => async (req, res, next) => {
   try {
      const roleOfUser = req.user.role;

      const allow = rolesAllow.includes(roleOfUser) ;
      

      if(allow){
         req.roles = roleOfUser;
         return next();
      }
      console.log("khong co quyen")
      return next();
   } catch (error) {
      console.log("khong co quyen")
      return next();
   }
}

module.exports = { auth, authorize }