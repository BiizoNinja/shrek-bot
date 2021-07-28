const mongoose = require('mongoose')

const userData = new mongoose.Schema({
    GuildID: String, 
    RolesShop: Array,
});

module.exports = new mongoose.model('userProfileSchema', userData)