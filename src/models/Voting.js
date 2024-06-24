const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Voting = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', require: true},
    title: {type: String, require: true},
    listIdVoted: {type: Array, require: true},
    state:{type: Boolean, require: true},
    e:{type: Number, require: true},
    n:{type: Number, require: true},
    d:{type: Number, require: true},
}, {
    timestamps: true
});

module.exports = mongoose.model('Voting', Voting)