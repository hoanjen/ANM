const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VotingBox = new Schema({
    candidate_user: {type: mongoose.Schema.Types.ObjectId, ref:'CandidateUser', require: true},
    voting: {type: mongoose.Schema.Types.ObjectId, ref:'Voting', require: true},
    x: {type: Number, require: true},
    y: {type: Number, require: true},
}, {
    timestamps: true
});

module.exports = mongoose.model('VotingBox', VotingBox)