const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    GuildID: String,
    BoostChannel: String,
    BoostMessage: String, 

});

module.exports = new mongoose.model('boosters', schema)