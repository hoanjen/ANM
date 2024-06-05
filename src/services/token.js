
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createAccessToken = (userId, isAdmin) => {
    let infor = {
        os: 'ANM',
        id: userId,
        date: new Date().getTime(),
        expiry: new Date().getTime() + 2*24*60*60*1000, //one day,
        role: isAdmin ? 'admin' : 'user'
    };
    let accessToken = jwt.sign(infor, process.env.secret);
    return accessToken;
}


const extractTokenFromHeader = (request) => {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
};

module.exports = { createAccessToken, extractTokenFromHeader }