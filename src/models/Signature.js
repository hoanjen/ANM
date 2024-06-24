const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Signature = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', require: true},
    voting: {type: mongoose.Schema.Types.ObjectId, ref:'Voting', require: true},
    sig: {type: Number},
    c: {type: Number, require: true},
},{
    timestamps: true
})

module.exports = mongoose.model('Signature', Signature)