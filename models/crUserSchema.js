const mongoose = require('mongoose')

const crUser = new mongoose.Schema({
    UserID: String,
    GuildID: String,
    CustomRole: String
});

module.exports = new mongoose.model('crusers', crUser)