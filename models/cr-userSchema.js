const mongoose = require('mongoose')

const crUser = new mongoose.Schema({
    UserID: String,
    GuildId: String,
    CustomRole: String
});

module.exports = new mongoose.model('crUSer', crUser)