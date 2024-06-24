
const tokenService = require('../services/token');

const httpStatus = require("http-status");
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../models/User')



const auth = async (req,res, next) => {
   const token = req.cookies.access_token;
   if(!token) {
      console.log('no token')
      req.user = null;
      return res.redirect('/login');
   }
   const payload = jwt.verify(token, process.env.secret);
   console.log(payload);
   const user = await User.findById(payload.id).lean();
   if (!user) {
      console.log('token khon hop le');
      return res.redirect('/login');
   };
   req.user = user;
   next();
}

const authorize = (rolesAllow = []) => async (req, res, next) => {
   try {
      let allow;
      if(req.user.isAdmin){
         allow = rolesAllow.includes('admin') ;
      }
      else{
         allow = rolesAllow.includes('user') ;
      }

      if(allow){
         return next();
      }
      
      return res.redirect('/');
   } catch (error) {
      console.log(error);
      return next();
   }
}

module.exports = { auth, authorize }