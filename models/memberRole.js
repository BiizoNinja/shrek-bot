const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    GuildID: String,
    MemberRole: String
});

module.exports = new mongoose.model('memberRole', schema)