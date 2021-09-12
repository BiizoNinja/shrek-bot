const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    GuildID: String,
    LogChannel: String
})

module.exports = new mongoose.model('logchannel', schema)