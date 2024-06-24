const httpStatus = require('http-status')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const {createAccessToken} = require('../services/token')

const createUser = async (req) => {
    
    const check = await User.findOne({ cccd: req.body.cccd }).lean();
    if (check !== null) {
        throw new Error('cccd already exists on the system');
    }
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

const userLogin = async (req) => {
    const user = await User.findOne({ cccd: req.body.cccd }).lean();
    if (user == null) {
        throw new Error('Sai tên đăng nhập hoặc mật khẩu');
    }
    const comparePassword = bcrypt.compareSync(req.body.password, user.password);
    if (!comparePassword) {
        throw new Error('Sai tên đăng nhập hoặc mật khẩu');
    }
    const access_token = createAccessToken(user._id,user.isAdmin);

    return access_token;
}

module.exports = {createUser, userLogin}