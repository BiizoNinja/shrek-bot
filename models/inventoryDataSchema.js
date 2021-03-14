const mongoose = require('mongoose')

const invData = new mongoose.Schema({
    userId: String,
    inventory: Object
})

module.exports = mongoose.model('inventoryData', invData)
