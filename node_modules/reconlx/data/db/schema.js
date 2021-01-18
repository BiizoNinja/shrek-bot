const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    key : String,
    value : mongoose.SchemaTypes.Mixed,
})

module.exports = mongoose.model('reconDB', Schema)