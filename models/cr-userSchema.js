const mongoose = require('mongoose')

const crUser = new mongoose.Schema({
    UserID: String,
    CustomRole: String
});

module.exports = new mongoose.model('crUSer', crUser)