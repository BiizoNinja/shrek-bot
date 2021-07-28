const mongoose = require('mongoose')

const userData = new mongoose.Schema({
    userId: String, 
    guildId: String, 
    coins: Number
});

module.exports = new mongoose.model('userProfileSchema', userData)