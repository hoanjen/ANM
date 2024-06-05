const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CandidateUser = new Schema({
    name: {type: String , require: true},
   voting: {type: mongoose.Schema.Types.ObjectId, ref:'Voting', require: true},
},{
    timestamps: true
})

module.exports = mongoose.model('CandidateUser', CandidateUser)