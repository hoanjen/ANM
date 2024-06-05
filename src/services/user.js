const httpStatus = require('http-status')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')


const createUser = async (req) => {
    
    const check = await User.findOne({ cccd: req.body.cccd }).lean();
    if (check !== null) {
        // throw new ApiError(400,'email already exists on the system');
    }
    console.log(req.body);
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = {
        name: req.body.name,
        password: hashedPassword,
        cccd: req.body.cccd,
        isAdmin: req.body.isAdmin
    };
    const user = new User(newUser);
    await user.save();
    return user;
}

module.exports = {createUser}