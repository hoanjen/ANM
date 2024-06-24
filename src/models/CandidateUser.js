const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CandidateUser = new Schema({
    name: {type: String , require: true},
    index: {type: Number, require: true},
    voting: {type: mongoose.Schema.Types.ObjectId, ref:'Voting', require: true},
    choose: {type: Number, require: true},
},{
    timestamps: true
})

module.exports = mongoose.model('CandidateUser', CandidateUser)