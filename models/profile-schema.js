const mongoose = require('mongoose')

const reqSting = {
    type: 'string',
    required: true
}

const profileSchema = new mongoose.Schema({
    userID: reqSting,
    coins: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Profiles', profileSchema);