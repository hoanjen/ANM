const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: {type: String , require: true},
    cccd: {type: String, require: true},
    password: {type: String, require: true},
    isAdmin: {type: Boolean, require: true},
},{
    timestamps: true
})

module.exports = mongoose.model('User', User)