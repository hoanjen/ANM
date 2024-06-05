const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/ANM'),
        {
            useCreateIndex: true
        }
        console.log("Config mongodb success")
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connect }