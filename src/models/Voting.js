const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Voting = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', require: true},
    title: {type: String, require: true},
    listIdVoted: {type: Array, require: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Voting', Voting)